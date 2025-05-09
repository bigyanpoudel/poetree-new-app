import { Text } from "@/src/components";
import * as DocumentPicker from "expo-document-picker";
import { useField } from "formik";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

interface IUploaderProps {}

export const ProfileFileUploader: React.FC<IUploaderProps> = ({}) => {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset>();
  const [field, __, helpers] = useField("photo");
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

  return (
    <View className="flex flex-col gap-2  items-center justify-center">
      <TouchableOpacity onPress={pickFile} className="w-[100px] h-[100px]">
        {file?.uri || field.value?.includes("https:") ? (
          <View className="w-[90px] h-[90px] ">
            <Image
              source={{ uri: file?.uri ?? field.value }}
              className="w-[90px] h-[90px] object-cover rounded-full border border-ui-border dark:border-ui-border/20"
            />
          </View>
        ) : (
          <Avatar.Text
            size={90}
            label={"A"}
            labelStyle={{
              fontSize: 16,
              color: "white",
            }}
            className="dark:bg-black/50 bg-darkBackground "
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity className="mb-2" onPress={pickFile}>
        <Text className="text-lg">Change Profile Image</Text>
      </TouchableOpacity>
    </View>
  );
};
