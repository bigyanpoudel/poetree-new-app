import { Button, Text } from "@/src/components";
import { InputField } from "@/src/components/form/input";
import { ScreenLayout } from "@/src/components/layout";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { useForgetPassword } from "../hooks/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const ForgetPasswordPage = () => {
  const forgetPassword = useForgetPassword();
  const handleSubmit = async (values: { email: string }) => {
    await forgetPassword.mutateAsync({ ...values });
  };
  return (
    <ScreenLayout
      appBar={{
        title: "Forget Password",
      }}
    >
      <View className={"w-full max-w-md"}>
        {/* Welcome Header */}
        <View className={"flex flex-col gap-1.5 items-center mb-6"}>
          <Text className={"text-2xl font-bold  text-center"}>
            Forget Password
          </Text>
          <Text
            className={
              "text-sm font-medium dark:text-white/60 text-gray-500 text-center"
            }
          >
            Enter the email address with your account and we will send an email
            with confirmation to reset your password.
          </Text>
        </View>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <View className="flex flex-col gap-4">
              <InputField
                mode="outlined"
                label="Username / Email"
                placeholder="Username / Email"
                name="password"
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
                className="font-bold"
                onPress={() => {
                  handleSubmit();
                }}
              >
                Send Reset Link
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </ScreenLayout>
  );
};
