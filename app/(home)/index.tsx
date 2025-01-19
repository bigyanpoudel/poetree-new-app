import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/src/components/button";
import { CheckboxField } from "@/src/components/form/checkbox";
import { DropdownField } from "@/src/components/form/dropdown";
import { InputField } from "@/src/components/form/input";
import { Formik, FormikHelpers, FormikValues } from "formik";
import React from "react";
import {
  Appearance,
  Image,
  Platform,
  StyleSheet,
  useColorScheme,
} from "react-native";
import * as yup from "yup";

export default function HomeScreen() {
  const colorScheme = useColorScheme(); // Detects the current theme (light or dark)

  const isDarkTheme = colorScheme === "dark";
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      {/* <Button
        type="primary"
        onPress={() => {
          if (!isDarkTheme) {
            Appearance.setColorScheme("dark");
          } else {
            Appearance.setColorScheme("light");
          }
        }}
      >
        Hello
      </Button> */}
      <Button
        mode="contained"
        onPress={() => {
          if (!isDarkTheme) {
            Appearance.setColorScheme("dark");
          } else {
            Appearance.setColorScheme("light");
          }
        }}
      >
        Hello Papper
      </Button>
      <Formik
        initialValues={{}}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email("Please enter valid email")
            .required("Email Address is Required"),
        })}
        onSubmit={function (
          values: {},
          formikHelpers: FormikHelpers<{}>
        ): void | Promise<any> {
          console.log("submit");
        }}
      >
        {({ handleSubmit }) => (
          <>
            <InputField keyboardType="email-address" name="email" />
            <CheckboxField name="check" label="Check" />
            <DropdownField
              label="Check"
              name="dropdown"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
            <Button
              mode="contained"
              onPress={() => {
                handleSubmit();
              }}
            >
              Hello Papper
            </Button>
          </>
        )}
      </Formik>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
