import { Button } from "@/src/components/button";
import { InputField } from "@/src/components/form/input";
import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import { TentapEditorField, TentapEditorRef } from "@/src/features/poem/components/create-poem/editor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";
import { useGetAnthologyDetails, useSubmitPoem } from "../hooks";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Poem title is required"),
  body: Yup.string().required("Poem content is required"),
});

export const SubmitPoemToAnthology = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: anthology } = useGetAnthologyDetails();
  const router = useRouter();
  const submitPoem = useSubmitPoem();
  const editorRef = React.useRef<TentapEditorRef>(null);
  const rootRef = React.useRef<View>(null);
  const editorContainerRef = React.useRef<View>(null);

  // Handle outside click detection
  const handleRootPress = (event: any) => {
   
    // Check if click is inside or outside the editor area
    if (editorContainerRef.current && rootRef.current) {
      editorContainerRef.current.measureInWindow((x, y, width, height) => {
        const clickX = event.nativeEvent.pageX;
        const clickY = event.nativeEvent.pageY;
        
        // If click is inside the editor bounds, focus it
        if (
          clickX >= x && 
          clickX <= x + width && 
          clickY >= y && 
          clickY <= y + height
        ) {
          // Click is inside editor area, focus it
          console.log("Focusing editor");
          editorRef.current?.focus?.();
        } else {
          // Click is outside editor area, blur it
          editorRef.current?.blur();
        }
      });
    }
  };


  const handleFormSubmit = async (values: { title: string; body: string },formHelper:FormikHelpers<any>) => {

    if (!values?.body || values?.body.trim() === "" || values?.body === "<p></p>") {
      console.log("Submitting poem:", values);
      Toast.error("Poem content cannot be empty.");
      return;
    }

    await submitPoem.mutateAsync({
      id: id,
      poem: {
        title: values?.title,
        content: values?.body
      }
    }, {
      onSuccess: () => {
        Toast.success("Poem submitted successfully!");
        formHelper.resetForm();
        router.back();
      }
    })
    // Reset form and navigate back on success

  };

  if (!anthology) {
    return (
      <ScreenLayout
        appBar={{
          title: "Submit Poem 123",
        }}
      >
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <Formik
      initialValues={{
        title: "",
        body: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit }) => (
        <ScreenLayout
          appBar={{
            title: "Submit Poem",
          }}
        >
          <TouchableWithoutFeedback onPress={handleRootPress}>
            <View ref={rootRef} className="flex-1">
              <View className="flex flex-col gap-4 pb-20 px-4">
                {/* Anthology Info */}
                <View 
                 
                  className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
                >
                  <Text className="text-lg mb-1" fontWeight={500}>
                    {anthology.title} hello
                  </Text>
                  <Text className="text-sm text-blue-800 dark:text-blue-200 mb-2" fontWeight={500}>
                    Theme: {anthology.theme}
                  </Text>
                  <Text className="text-xs text-blue-700 dark:text-blue-300" fontWeight={400}>
                    Deadline: {new Date(anthology.submissionDeadline).toLocaleDateString()}
                  </Text>
                </View>

                {/* Title Field */}
                <InputField
                  mode="outlined"
                  name="title"
                  label="Poem Title"
                  placeholder="Enter your poem title"
                  onBlur={() => { Keyboard.dismiss(); }}
                />

                {/* Body Field */}
                <View ref={editorContainerRef}>
                  <TentapEditorField
                    ref={editorRef}
                    label="Poem Content"
                    name="body"
                    onBlur={() => {
                      Keyboard.dismiss();
                    }}
                  />
                </View>

                {/* Submission Guidelines */}
                <View 
                
                  className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg"
                >
                  <Text className="text-sm mb-2" fontWeight={600}>
                    Submission Guidelines
                  </Text>
                  <Text className="text-xs opacity-70 leading-4" fontWeight={400}>
                    • Make sure your poem follows the theme: {anthology.theme}
                  </Text>
                  <Text className="text-xs opacity-70 leading-4" fontWeight={400}>
                    • Ensure your poem is original and follows community guidelines
                  </Text>
                  <Text className="text-xs opacity-70 leading-4" fontWeight={400}>
                    • Submit before the deadline: {new Date(anthology.submissionDeadline).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              {/* Fixed Bottom Buttons */}
              <View className="flex-col flex gap-4">
                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  loading={submitPoem.isPending}
                  className="flex-1"
                >
                  Submit Poem
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => {
                    if (submitPoem?.isPending) return;
                    router.back()
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScreenLayout>
      )}
    </Formik>
  );
};