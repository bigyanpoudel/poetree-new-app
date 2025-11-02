import { Button, Text } from "@/src/components";
import { DropdownField } from "@/src/components/form/dropdown";
import { InputField } from "@/src/components/form/input";
import { ScreenLayout } from "@/src/components/layout";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Obj } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";
import { COUNTRYLIST } from "@/src/utils/constant/countryConstant";
import { generateSelectOptions } from "@/src/utils/form";
import { Link } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { View, Keyboard } from "react-native";
import { TextInput } from "react-native-paper";
import * as Yup from "yup";
import { useSignup } from "../hooks/auth";

import Recaptcha, { RecaptchaRef } from 'react-native-recaptcha-that-works';

import { APPENV } from "@/src/config/env";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address") // Validate email format
    .required("Email is required"), // Make email field required
  country: Yup.string().required("Country is required"),
  name: Yup.string().required("Name is required"),
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

export const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState<boolean>(false);
  const isDark = useIsDarkTheme();
  const signup = useSignup();
  const recaptchaRef = React.useRef<RecaptchaRef>(null);
  const [formValues, setFormValues] = React.useState<Obj | null>(null);

  const handleSubmit = async (values: Obj) => {
    setFormValues(values);
    recaptchaRef.current?.open();
  };

  const onRecaptchaVerify = async (token: string) => {
    console.log("Recaptcha token:", token);

    // Dismiss keyboard to prevent it from opening after verification
    Keyboard.dismiss();

    if (formValues) {
      await signup.mutateAsync({
        ...formValues,
        slug: formValues.email.split("@")[0],
        recaptchaToken: token
      });
    }
  };

  return (
    <ScreenLayout
      appBar={{
        title: "Signin",
      }}
    >
      <View className={"w-full max-w-md"}>
        {/* Welcome Header */}
        <View className={"flex flex-col gap-1.5 items-center mb-6"}>
          <Text className={"text-2xl font-bold  text-center"}>Signup</Text>
          <Text
            className={
              "text-sm font-medium dark:text-white/60 text-gray-500 text-center"
            }
          >
            Create your account using your email address
          </Text>
        </View>
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            country: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <View className="flex flex-col gap-4">
              <InputField
                mode="outlined"
                label="Full Name"
                placeholder="Enter full name"
                name="name"
              />
              <InputField
                mode="outlined"
                label="Username / Email"
                placeholder="Username / Email"
                name="email"
              />
              <DropdownField
                options={generateSelectOptions(COUNTRYLIST, "code", "name")}
                name="country"
                label="Country"
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
                name="confirmPassword"
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
                loading={signup.isPending}
                mode="contained"
                contentStyle={{
                  height: 48,
                }}
                labelStyle={{
                  fontWeight: 700,
                  fontSize: 16,
                }}
                className="font-bold mt-8"
                onPress={() => {
                  handleSubmit();
                }}
              >
                Signup
              </Button>

              {/* Sign Up Link */}
              <View
                className={
                  "flex flex-row justify-center items-center gap-2 mt-6"
                }
              >
                <Text
                  className={
                    "text-base font-medium text-gray-500 dark:text-white/60"
                  }
                >
                  Already have an account ?
                </Text>
                <Link href="/signin">
                  <Text
                    className={
                      " text-base font-medium underline underline-offset-2"
                    }
                  >
                    Signin
                  </Text>
                </Link>
              </View>
            </View>
          )}
        </Formik>

        <Recaptcha
          ref={recaptchaRef}
          siteKey={APPENV.NEXT_PUBLIC_RECAPTCH_SITE_KEY}
          baseUrl="https://www.poetree.ca"
          onVerify={onRecaptchaVerify}
          size="invisible"
          theme={isDark ? "dark" : "light"}

        />
      </View>
    </ScreenLayout>
  );
};
