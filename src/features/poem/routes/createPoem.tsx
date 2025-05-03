import { Button } from "@/src/components";
import { InputField } from "@/src/components/form/input";
import { SwitchField } from "@/src/components/form/swtich";
import { ScreenLayout } from "@/src/components/layout";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import * as Yup from "yup";
import { TentapEditorField } from "../components/create-poem/editor";
import { TagInputField } from "../components/create-poem/form/poemtags";
import { PoemType } from "../components/create-poem/form/poemType";
import { FileUploader } from "../components/create-poem/form/uploader";
import { useCreatePoem, useUpdatePoem } from "../hooks/addPoem";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Poem title is required"),
  body: Yup.string().required("Poem content is required"),
});
export const CreatePoem = () => {
  const createPoem = useCreatePoem();
  const updatePoem = useUpdatePoem();
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
    const res = await createPoem.mutateAsync(formData);
    if (res) {
      formHelper.resetForm();
    }
    // if (!poem?._id) {

    // } else {
    //   const res = await updatePoem.mutateAsync({
    //     id: poem?._id,item
    //     body: formData,
    //   });
    //   if (res) {
    //     router.push(APPROUTES.poemDetails.replaceAll(":id", poem.slug));
    //   }
    // }
    console.log("values-->", values);
  };
  return (
    <ScreenLayout
      appBar={{
        title: "Create Poem",
      }}
    >
      <Formik
        initialValues={{
          title: "",
          body: "",
          postType: "text",
          availability: false,
          tags: [],
          tag: "",
          file: null,
        }}
        enableReinitialize
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <View className="flex flex-col gap-4">
            <PoemType label="Select Poem Medium" name="postType" />
            <InputField
              mode="outlined"
              name={"title"}
              label={"Title"}
              placeholder={"Enter poem title"}
            />
            <TentapEditorField label="Poem Content" name={"body"} />
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
            <FileUploader label={"Select Poem File"} name="file" />

            <Button
              loading={createPoem.isPending}
              mode="contained"
              contentStyle={{
                height: 48,
              }}
              labelStyle={{
                fontWeight: 700,
                fontSize: 16,
              }}
              className="font-bold mt-6"
              onPress={() => {
                handleSubmit();
              }}
            >
              Save Poem
            </Button>
          </View>
        )}
      </Formik>
    </ScreenLayout>
  );
};
