import { Button } from "@/src/components";
import { InputField } from "@/src/components/form/input";
import { SwitchField } from "@/src/components/form/swtich";
import { ScreenLayout } from "@/src/components/layout";
import { PostVisibilitTypeEnum } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";
import { TentapEditorField } from "../components/create-poem/editor";
import { TagInputField } from "../components/create-poem/form/poemtags";
import { PoemType } from "../components/create-poem/form/poemType";
import { FileUploader } from "../components/create-poem/form/uploader";
import { useCreatePoem, useUpdatePoem } from "../hooks/addPoem";
import { useGetPoemDetails } from "../hooks/poemDetail";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Poem title is required"),
  body: Yup.string().required("Poem content is required"),
});
export const CreatePoem = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useGetPoemDetails(id);
  const insets = useSafeAreaInsets();
  const createPoem = useCreatePoem();
  const updatePoem = useUpdatePoem();
  const router = useRouter();
  const handleSubmit = async (values: any, formHelper: FormikHelpers<any>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("visibility", values.availability ? "paid" : "free");

    if (values?.tags && values?.tags?.length > 0) {
      values?.tags.forEach((item: string, index: number) => {
        formData.append(`hashTags[${index}]`, item);
      });
    }
    if (values?.file) {
      const file: any = {
        uri: values?.file.uri,
        type: values?.file.mimeType,
        name: values?.file.name,
      };
      if (values?.postType === "text") {
        formData.append("thumbnail", file);
      }
      if (values?.postType === "audio") {
        formData.append("audio", file);
      }
      if (values?.postType === "video") {
        formData.append("video", file);
      }
    }
    if (!id) {
      const res = await createPoem.mutateAsync(formData);
      if (res) {
        formHelper.resetForm();
      }
    } else {
      const res = await updatePoem.mutateAsync({
        id: data?._id as string,
        body: formData,
      });
      router.push(`/poem/${data?.slug}?name=${values?.title}`);
    }
  };
  return (
    <Formik
      initialValues={{
        title: data?.title ?? "",
        body: data?.body ?? "",
        postType: data?.audio ? "audio" : data?.video ? "video" : "text",
        availability: data?.visibility === PostVisibilitTypeEnum.paid,
        tags: data?.hashTags.map((item) => item.name) ?? [],
        tag: "",
        file: null,
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <View className="flex flex-1 relative">
          <ScreenLayout

            appBar={{
              title: id ? "Update Poem" : "Create Poem",
            }}
          >
            <View className="flex flex-col gap-4 pb-20">
              <PoemType label="Select Poem Medium" name="postType" />
              <InputField
                mode="outlined"
                name={"title"}
                label={"Title"}
                placeholder={"Enter poem title"}
              />
              <TentapEditorField
                deafultvalue={data?.body}
                label="Poem Content"
                name={"body"}
              />
              <TagInputField
                name="tag"
                label="Tags"
                placeholder={"Enter poem tag"}
              />
              <SwitchField
                leftText="Free"
                rightText="Paid"
                name="availability"
                label="Availability"
              />
              <FileUploader
                deafultFile={data?.thumbnail ?? data?.audio ?? data?.video}
                label={"Select Poem File"}
                name="file"
              />
            </View>
          </ScreenLayout>
          <View
            style={{
              paddingBottom: insets.bottom + 8,
            }}
            className="absolute px-5 dark:bg-darkBackground pt-3 bottom-0 left-0 w-full z-[1]"
          >
            <Button
              loading={createPoem.isPending || updatePoem.isPending}
              mode="contained"
              contentStyle={{
                height: 48,
              }}
              labelStyle={{
                fontWeight: 700,
                fontSize: 16,
              }}
              className="font-bold"
              onPress={() => {
                handleSubmit();
              }}
            >
              {id ? "Update Poem" : "Save Poem"}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};
