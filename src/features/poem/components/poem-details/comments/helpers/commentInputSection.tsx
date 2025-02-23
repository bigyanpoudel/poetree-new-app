import { InputField } from "@/src/components/form/input";
import { Obj } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";
import { Formik } from "formik";
import React from "react";
import { useColorScheme } from "react-native";
import { TextInput } from "react-native-paper";
import * as Yup from "yup";

// Validation Schema (optional)
const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .trim()
    .required("Comment is required")
    .max(500, "Comment must be less than 500 characters"),
});

export const CommentInputSection = () => {
  const colorSchema = useColorScheme();

  const isDark = colorSchema === "dark";

  // Handle Form Submission
  const handleSubmit = (values: Obj, { resetForm }: any) => {
    console.log("Submitted Comment:", values.comment);
    resetForm(); // Clear the form after submission
  };

  return (
    <Formik
      initialValues={{
        comment: "",
      }}
      validationSchema={CommentSchema} // Optional: Add validation
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,

        isSubmitting,
      }) => (
        <InputField
          mode="outlined"
          multiline
          numberOfLines={6}
          placeholder="Write comment..."
          name="comment"
          outlineStyle={{
            borderRadius: 12,
          }}
          height={"auto"}
          value={values.comment}
          onChangeText={handleChange("comment")}
          onBlur={handleBlur("comment")}
          disabled={isSubmitting}
          right={
            <TextInput.Icon
              onPress={() => {
                handleSubmit();
              }}
              color={isDark ? Colors.dark.text : Colors.light.text}
              icon="send"
            />
          }
        />
      )}
    </Formik>
  );
};
