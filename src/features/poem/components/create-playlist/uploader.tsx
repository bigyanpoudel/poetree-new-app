import { Text } from "@/src/components";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface IUploaderProps {
  name: string;
  label?: string;
}

export const PlaylistFileUploader: React.FC<IUploaderProps> = ({
  name,
  label,
}) => {
  const [field, meta, helpers] = useField(name);
  const [file, setFile] = useState<any>(null);
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
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

  const renderFilePreview = () => {
    if (!file) return null;
    const { uri, mimeType: type } = file;
    if (type?.startsWith("image")) {
      return <Image source={{ uri }} style={{ width: "100%", height: 200 }} />;
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
      {file && (
        <Text className="text-lg pl-2 capitalize">Thumbnail File Preview</Text>
      )}
      {/* Render the preview of the uploaded file */}
      <View>{renderFilePreview()}</View>
    </View>
  );
};
