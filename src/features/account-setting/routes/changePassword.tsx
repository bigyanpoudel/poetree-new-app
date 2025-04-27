import { InputField } from "@/src/components/form/input";
import { ScreenLayout } from "@/src/components/layout";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { Button } from "@/src/components";
import { TextInput } from "react-native-paper";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, "Password must be at least 8 characters") // Minimum length
    .matches(
      /^(?=.*[a-z])/, // At least one lowercase letter
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /^(?=.*[A-Z])/, // At least one uppercase letter
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*\d)/, // At least one number
      "Password must contain at least one number"
    )
    .required("Password is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // Minimum length
    .matches(
      /^(?=.*[a-z])/, // At least one lowercase letter
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /^(?=.*[A-Z])/, // At least one uppercase letter
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*\d)/, // At least one number
      "Password must contain at least one number"
    )
    .required("Password is required"), // Make password field required
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match") // Match password field
    .required("Confirm Password is required"),
});

export const ChangePassword = () => {
  const [currentPasswordVisible, setCurrentPasswordVisible] =
    React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState<boolean>(false);
  const isDark = useIsDarkTheme();
  return (
    <ScreenLayout
      appBar={{
        title: "Change Password",
      }}
    >
      <Formik
        initialValues={{
          comment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ handleSubmit }) => (
          <View className="flex flex-col gap-4">
            <InputField
              name="currentPassword"
              mode="outlined"
              label="CurrenyPassword"
              placeholder="Password"
              secureTextEntry={!currentPasswordVisible}
              right={
                currentPasswordVisible ? (
                  <TextInput.Icon
                    onPress={() => {
                      setCurrentPasswordVisible(!currentPasswordVisible);
                    }}
                    icon="eye-off"
                    color={isDark ? Colors.dark.text : Colors.light.text}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={() => {
                      setCurrentPasswordVisible(!currentPasswordVisible);
                    }}
                    icon="eye"
                    color={isDark ? Colors.dark.text : Colors.light.text}
                  />
                )
              }
            />
            <InputField
              name="password"
              mode="outlined"
              label="Password"
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              right={
                passwordVisible ? (
                  <TextInput.Icon
                    onPress={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                    icon="eye-off"
                    color={isDark ? Colors.dark.text : Colors.light.text}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                    icon="eye"
                    color={isDark ? Colors.dark.text : Colors.light.text}
                  />
                )
              }
            />
            <InputField
              name="confrimPassword"
              mode="outlined"
              label="Confirm Password"
              placeholder="Enter confirm password"
              secureTextEntry={!passwordVisible}
              right={
                confirmPasswordVisible ? (
                  <TextInput.Icon
                    onPress={() => {
                      setConfirmPasswordVisible(!confirmPasswordVisible);
                    }}
                    icon="eye-off"
                    color={isDark ? Colors.dark.text : Colors.light.text}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={() => {
                      setConfirmPasswordVisible(!confirmPasswordVisible);
                    }}
                    icon="eye"
                    color={isDark ? Colors.dark.text : Colors.light.text}
                  />
                )
              }
            />

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
              Change Password
            </Button>
          </View>
        )}
      </Formik>
    </ScreenLayout>
  );
};
