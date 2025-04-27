import { Button } from "@/src/components";
import { InputField } from "@/src/components/form/input";
import { SwitchField } from "@/src/components/form/swtich";
import { ScreenLayout } from "@/src/components/layout";
import { Formik } from "formik";
import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { TentapEditorField } from "../components/create-poem/editor";
import { TagInputField } from "../components/create-poem/form/poemtags";
import { PoemType } from "../components/create-poem/form/poemType";
import { FileUploader } from "../components/create-poem/form/uploader";

export const CreatePoem = () => {
  return (
    <ScreenLayout
      appBar={{
        title: "Create Poem",
      }}
    >
      <Formik
        initialValues={{
          comment: "",
          html: `<p>hello their</p>`,
          postType: "text",
        }}
        // validationSchema={{}}
        onSubmit={(values) => {
          console.log("values", values);
        }}
      >
        {({ handleSubmit }) => (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex flex-col gap-4">
              <PoemType label="Select Poem Medium" name="postType" />
              <InputField
                mode="outlined"
                name={"title"}
                label={"Title"}
                placeholder={"Enter poem title"}
              />
              <TentapEditorField label="Poem Content" name={"html"} />
              <TagInputField
                name="tags"
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
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </ScreenLayout>
  );
};
