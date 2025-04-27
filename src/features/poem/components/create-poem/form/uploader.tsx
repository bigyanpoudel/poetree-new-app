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
}

export const FileUploader: React.FC<IUploaderProps> = ({ name, label }) => {
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
      setFile(file);
      helpers.setValue(file);
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  useEffect(() => {
    setFile(field.value);
  }, [field.value]);
  console.log("filed", file);

  const renderFilePreview = () => {
    if (!file) return null;
    const { uri, name, mimeType: type } = file;
    console.log("uri", uri, type);
    if (type?.startsWith("image")) {
      return <Image source={{ uri }} style={{ width: "100%", height: 200 }} />;
    } else if (type?.startsWith("video")) {
      return <VideoScreen />;
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
        <Text className="text-lg pl-2 capitalize">{postType} File Preview</Text>
      )}
      {/* Render the preview of the uploaded file */}
      <View>{renderFilePreview()}</View>
    </View>
  );
};
