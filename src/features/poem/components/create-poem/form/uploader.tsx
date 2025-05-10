import { Text } from "@/src/components";
import { AudioPlayer } from "@/src/components/audioPlayer";
import VideoScreen from "@/src/components/videoPlayer";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface IUploaderProps {
  name: string;
  label?: string;
  deafultFile?: string;
}

export const FileUploader: React.FC<IUploaderProps> = ({
  name,
  label,
  deafultFile,
}) => {
  const [postTypeField] = useField("postType");
  const [field, meta, helpers] = useField(name);
  const [file, setFile] = useState<any>(null);
  const postType = postTypeField.value;
  const getAcceptType = React.useMemo(() => {
    switch (postType) {
      case "audio":
        return "audio/*"; // Specify accepted audio formats
      case "video":
        return "video/*"; // Specify accepted video formats
      default:
        return "image/*"; // Specify accepted image formats
    }
  }, [postType]);
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: getAcceptType || "*/*",
        multiple: false,
      });
      if (result?.canceled) return; // If canceled, do nothing
      const file = result.assets[0];
      console.log("picked file", file);
      setFile(file);
      helpers.setValue(file);
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  useEffect(() => {
    setFile(field.value);
  }, [field.value]);

  const renderFilePreview = () => {
    if (deafultFile && !file) {
      if (postType === "text") {
        return (
          <Image
            source={{ uri: deafultFile }}
            style={{ width: "100%", height: 200 }}
          />
        );
      } else if (postType === "video") {
        return <VideoScreen url={deafultFile as string} />;
      } else if (postType === "audio") {
        return <AudioPlayer uri={deafultFile} />;
      }
    }
    if (!file) return null;
    const { uri, name, mimeType: type } = file;
    console.log("uri video", uri, type);
    if (type?.startsWith("image")) {
      return <Image source={{ uri }} style={{ width: "100%", height: 200 }} />;
    } else if (type?.startsWith("video")) {
      return <VideoScreen url={uri} />;
    } else if (type?.startsWith("audio")) {
      return <AudioPlayer uri={uri} />;
    } else {
      return <Text>{name}</Text>; // Show file name for unsupported file types
    }
  };

  return (
    <View className="flex flex-col gap-4">
      <View className={"w-full flex flex-col gap-2"}>
        {label && <Text className="text-lg pl-2">{label}</Text>}
        <TouchableOpacity
          onPress={pickFile}
          className="h-[200px] border p-4 rounded-xl border-dashed flex flex-col gap-2 items-center justify-center dark:border-ui-border/40 dark:bg-darker-200"
        >
          <Feather
            name="upload-cloud"
            size={50}
            className="dark:text-darkTextColor text-ligtTextColor"
          />
          <Text className="text-xl">Upload File</Text>
        </TouchableOpacity>
        {meta.touched && meta.error && (
          <Text className="dark:text-red-500 text-red-500 text-sm pl-2">
            {meta.error}
          </Text>
        )}
      </View>
      {label && (
        <Text className="text-lg pl-2 capitalize">
          {postType == "text" ? "Image" : postType} File Preview
        </Text>
      )}
      {/* Render the preview of the uploaded file */}
      <View>{renderFilePreview()}</View>
    </View>
  );
};
