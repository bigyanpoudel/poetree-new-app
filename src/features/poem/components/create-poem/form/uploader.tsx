import React, { useState } from "react";
import { View, Button, Image, Platform, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useField, useFormik } from "formik";
import { TextInput, HelperText } from "react-native-paper";
import { Text } from "@/src/components";
import { Feather } from "@expo/vector-icons";
interface IUploaderProps {
  name: string;
  accept?: string;
  label?: String;
}

export const FileUploader: React.FC<IUploaderProps> = ({
  name,
  accept,
  label,
}) => {
  const [field, meta, helpers] = useField(name);
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: accept || "*/*",
        multiple: false,
      });
      if (result?.canceled) return; // If canceled, do nothing
      helpers.setValue(result);
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  return (
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
  );
};
