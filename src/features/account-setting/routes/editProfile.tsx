import { Button } from "@/src/components";
import { DropdownField } from "@/src/components/form/dropdown";
import { InputField } from "@/src/components/form/input";
import { ScreenLayout } from "@/src/components/layout";
import { COUNTRYLIST } from "@/src/utils/constant/countryConstant";
import { generateSelectOptions } from "@/src/utils/form";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { ProfileFileUploader } from "../components/edit-profile/uploadProfile";

export const EditProfile = () => {
  return (
    <ScreenLayout
      appBar={{
        title: "Edit Profile",
      }}
    >
      <Formik
        initialValues={{
          comment: "",
        }}
        // validationSchema={}
        onSubmit={() => {}}
      >
        {({ handleSubmit }) => (
          <View className="flex flex-col gap-4">
            <ProfileFileUploader />
            <InputField
              mode="outlined"
              label="Full Name"
              placeholder="Enter full name"
              name="name"
            />

            <InputField
              mode="outlined"
              label="About"
              placeholder="Enter about"
              name="about"
              multiline
              numberOfLines={7}
              height={"auto"}
              style={{
                minHeight: 48,
              }}
              outlineStyle={{
                borderRadius: 12,
              }}
            />
            <DropdownField
              options={generateSelectOptions(COUNTRYLIST, "code", "name")}
              name="country"
              label="Country"
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
              Update Profile
            </Button>
          </View>
        )}
      </Formik>
    </ScreenLayout>
  );
};
