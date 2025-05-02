import { Button } from "@/src/components";
import { DropdownField } from "@/src/components/form/dropdown";
import { InputField } from "@/src/components/form/input";
import { ScreenLayout } from "@/src/components/layout";
import { useGetCurrentUser } from "@/src/hooks/useRootHook";
import { COUNTRYLIST } from "@/src/utils/constant/countryConstant";
import { generateSelectOptions } from "@/src/utils/form";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { ProfileFileUploader } from "../components/edit-profile/uploadProfile";
const validationSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  name: Yup.string().required("Name is required"),
});

export const EditProfile = () => {
  const currentUser = useGetCurrentUser();
  return (
    <ScreenLayout
      appBar={{
        title: "Edit Profile",
      }}
    >
      <Formik
        initialValues={{
          ...currentUser.data,
        }}
        enableReinitialize
        validationSchema={validationSchema}
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
