import { Button, Text } from "@/src/components";
import { CheckboxField } from "@/src/components/form/checkbox";
import { InputField } from "@/src/components/form/input";
import { ScreenLayout } from "@/src/components/layout";
import { Obj } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";
import { storageUtil } from "@/src/utils/storage";
import { Link } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { useColorScheme, View, Modal, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import * as Yup from "yup";
import { useSignin } from "../hooks/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address") // Validate email format
    .required("Email is required"), // Make email field required
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
});

export const SigninPage = () => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [showSecurityModal, setShowSecurityModal] =
    React.useState<boolean>(false);
  const [initialValues, setInitialValues] = React.useState<Obj>({
    email: "",
    password: "",
    isRemember: false,
  });
  const colorSchema = useColorScheme();
  const isDark = colorSchema === "dark";
  const signin = useSignin();
  const isRemember = storageUtil.getItem("isRemember");
  React.useEffect(() => {
    handleGetRemember();
    checkSecurityNoticeShown();
  }, []);

  const handleGetRemember = async () => {
    const values = await storageUtil.getItem("isRemember");
    if (values?.email) {
      setInitialValues(values);
    }
  };

  const checkSecurityNoticeShown = async () => {
    const hasSeenSecurityNotice = await storageUtil.getItem(
      "hasSeenSecurityNotice"
    );
    if (!hasSeenSecurityNotice) {
      setShowSecurityModal(true);
    }
  };

  const handleCloseSecurityModal = async () => {
    await storageUtil.setItem("hasSeenSecurityNotice", JSON.stringify(true));
    setShowSecurityModal(false);
  };
  const handleSubmit = async (values: Obj) => {
    if (values.isRemember) {
      const data = await storageUtil.setItem(
        "isRemember",
        JSON.stringify(values)
      );
    } else {
      await storageUtil.clearItem("isRemember");
    }
    await signin.mutateAsync({ ...values });
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
            ...initialValues,
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <View className="flex flex-col gap-4">
              <InputField
                mode="outlined"
                label="Username / Email"
                placeholder="Username / Email"
                name="email"
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

                <Link href="/forget-password">
                  <Text className={" text-base font-medium"}>
                    Forgot Password?
                  </Text>
                </Link>
              </View>

              <Button
                loading={signin.isPending}
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

        {/* Security Update Notice */}
        <View
          className={
            "mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          }
        >
          <Text
            className={
              "text-sm font-semibold text-black dark:text-white mb-2"
            }
          >
            🔒 Security Enhancement
          </Text>
          <Text
            className={"text-sm text-gray-700 dark:text-gray-300 leading-5"}
          >
            We've upgraded our security with a new encryption system to better
            protect your account. If you're an existing user and having trouble
            signing in, please use "Forgot Password?" to reset your password and
            continue enjoying Poetree securely.
          </Text>
        </View>
      </View>

      {/* Security Update Modal */}
      <Modal
        visible={showSecurityModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseSecurityModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View
            className={`w-full max-w-sm p-6 rounded-xl ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <View className="items-center mb-4">
              <Text
                className={`text-lg font-bold text-center ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Security Enhancement
              </Text>
            </View>

            <Text
              className={`text-base leading-6 text-center mb-6 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              We've upgraded our security with a new encryption system to better
              protect your account.
              {"\n\n"}
              If you're an existing user and having trouble signing in, please
              use "Forgot Password?" to reset your password and continue
              enjoying Poetree securely.
            </Text>

            <Button
              mode="contained"
              onPress={handleCloseSecurityModal}
              contentStyle={{
                height: 44,
              }}
              labelStyle={{
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Got it!
            </Button>
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
};
