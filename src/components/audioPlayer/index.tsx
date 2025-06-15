import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio, AVPlaybackStatus, AVPlaybackStatusError } from "expo-av";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../text";
interface IAudioPlayer {
  uri: string;
}
export const AudioPlayer: React.FC<IAudioPlayer> = ({ uri }) => {
  const [sound, setSound] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1); // Volume level from 0 to 1

  // Load the audio
  const loadAudio = async () => {
    try {
      setIsLoading(true);
      const {
        sound,
        status,
      }: { sound: any; status: AVPlaybackStatus | AVPlaybackStatusError } =
        await Audio.Sound.createAsync({ uri: uri }, { shouldPlay: false });
      setSound(sound);
      // Check if status is of type AVPlaybackStatus
      if ("durationMillis" in status) {
        setDuration(status.durationMillis ?? 0); // Get duration in milliseconds
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading audio:", error);
      setIsLoading(false);
    }
  };

  // Play or pause the audio
  const togglePlayback = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  // Seek to a specific position in the audio
  const onSeek = async (value: number) => {
    await sound.setPositionAsync(value * duration);
  };

  // Handle audio playback status update
  const updateProgress = async () => {
    const status = await sound.getStatusAsync();
    if (status.positionMillis) {
      setPosition(status.positionMillis);
    }
  };

  // Unload the audio when the component unmounts
  useEffect(() => {
    loadAudio();
  }, [uri]);

  useEffect(() => {
    const interval = setInterval(updateProgress, 100); // Update progress every second
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      clearInterval(interval);
    };
  }, [isLoading]);

  // Format the time into mm:ss
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000); // 1 minute = 60,000 ms
    const seconds = Math.floor((milliseconds % 60000) / 1000); // Get seconds part
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View className="flex flex-col items-center justify-center gap-2 dark:bg-darker-200 bg-white rounded-lg p-3">
      <TouchableOpacity
        onPress={togglePlayback}
        className="bg-black/40 p-4 rounded-full"
      >
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={30}
          className="dark:text-darkTextColor text-ligtTextColor"
        />
      </TouchableOpacity>

      <View className="flex flex-row gap-4 items-center">
        <Text fontWeight={500}>{formatTime(position)}</Text>
        <Slider
          style={{
            width: "70%",
          }}
          value={position / duration}
          minimumValue={0}
          maximumValue={1}
          onValueChange={onSeek}
          disabled={isLoading}
        />
        <Text fontWeight={500}>{formatTime(duration)}</Text>
      </View>

      <View className="flex flex-row items-center justify-between gap-4">
        <Text className="pr-4">Volume</Text>
        <Slider
          style={{
            width: "70%",
          }}
          value={volume}
          minimumValue={0}
          maximumValue={1}
          onValueChange={setVolume}
          onSlidingComplete={async (value) => {
            setTimeout(async () => {
              await sound.setVolumeAsync(value);
            }, 500);
          }}
        />
      </View>
    </View>
  );
};
