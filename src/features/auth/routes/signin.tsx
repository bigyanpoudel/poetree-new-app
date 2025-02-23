import { Button, Text } from "@/src/components";
import { CheckboxField } from "@/src/components/form/checkbox";
import { InputField } from "@/src/components/form/input";
import { ScreenLayout } from "@/src/components/layout";
import { Colors } from "@/src/utils/constant/colors";
import { Link } from "expo-router";
import { Formik } from "formik";
import { Eye } from "lucide-react-native";
import React from "react";
import { useColorScheme, View } from "react-native";
import { TextInput } from "react-native-paper";

export const SigninPage = () => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const colorSchema = useColorScheme();
  const isDark = colorSchema === "dark";
  return (
    <ScreenLayout
      appBar={{
        title: "Signin",
      }}
    >
      <View className={"w-full max-w-md"}>
        {/* Welcome Header */}
        <View className={"flex flex-col gap-1.5 items-center mb-6"}>
          <Text className={"text-2xl font-bold  text-center"}>
            Welcome Back!
          </Text>
          <Text
            className={
              "text-sm font-medium dark:text-white/60 text-gray-500 text-center"
            }
          >
            Please enter your credentials to log in to your account
          </Text>
        </View>
        <Formik
          initialValues={{
            comment: "",
          }}
          onSubmit={() => {}}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,

            isSubmitting,
          }) => (
            <View className="flex flex-col gap-4">
              <InputField
                mode="outlined"
                label="Username / Email"
                placeholder="Username / Email"
                name="password"
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
              {/* Remember Me & Forgot Password */}
              <View
                className={"flex flex-row justify-between items-center mb-6"}
              >
                <CheckboxField name={"isRemember"} label={"Remember me"} />

                <Link href="/signup">
                  <Text className={" text-base font-medium"}>
                    Forgot Password?
                  </Text>
                </Link>
              </View>

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
                Signin
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
                  Don't have an account?
                </Text>
                <Link href="/signup">
                  <Text
                    className={
                      " text-base font-medium underline underline-offset-2"
                    }
                  >
                    Sign Up
                  </Text>
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScreenLayout>
  );
};
