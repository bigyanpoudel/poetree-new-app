import { Button, Text } from "@/src/components";
import { InputField } from "@/src/components/form/input";
import { SwitchField } from "@/src/components/form/swtich";
import { ScreenLayout } from "@/src/components/layout";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Formik } from "formik";
import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { PoemItem } from "../components/create-playlist/poemItem";
import { PlaylistFileUploader } from "../components/create-playlist/uploader";
import { TagInputField } from "../components/create-poem/form/poemtags";
import { CustomDrawer } from "@/src/components/drawer";
import { SelectPoem } from "../components/create-playlist/selectPoem";

export const CreatePlaylist = () => {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [bottomSheetIndex, setBottomSheetIndex] = React.useState<number>(-1);
  return (
    <GestureHandlerRootView nativeID="modal">
      <View className="flex flex-1">
        <ScreenLayout
          appBar={{
            title: "Create Playlist",
          }}
        >
          <Formik
            initialValues={{
              comment: "",
              html: `<p>hello their</p>`,
              postType: "text",
            }}
            // validationSchema={{}}
            onSubmit={(values) => {
              console.log("values", values);
            }}
          >
            {({ handleSubmit }) => (
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className="flex flex-col gap-4">
                  <InputField
                    mode="outlined"
                    name={"title"}
                    label={"Title*"}
                    placeholder={"Enter playlist title"}
                  />
                  <InputField
                    mode="outlined"
                    label="Price* (CA$) "
                    name={"price"}
                    inputMode="numeric"
                    placeholder={"Enter playlist price "}
                  />
                  <SwitchField
                    leftText="Inactive"
                    rightText="Active"
                    name="availability"
                    label="Status"
                  />
                  <TagInputField
                    name="tags"
                    label="Tags"
                    placeholder={"Enter poem tag"}
                  />
                  <PlaylistFileUploader
                    label={"Select Plyalist Thumbnail"}
                    name="file"
                  />
                  <View className="flex flex-col gap-2">
                    <Text className="text-lg pl-2">Select Playlist Poem</Text>
                    <Button
                      mode="contained"
                      contentStyle={{
                        height: 48,
                      }}
                      labelStyle={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: "white",
                        textAlign: "left",
                      }}
                      className="font-bold text-left flex flex-row  bg-darker-200"
                      onPress={() => {
                        setBottomSheetIndex(0);
                        bottomSheetRef.current?.expand();
                      }}
                    >
                      Please Select Poem
                    </Button>
                  </View>
                  <PoemItem onPress={() => {}} />
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
                    Save Poem
                  </Button>
                </View>
              </TouchableWithoutFeedback>
            )}
          </Formik>
        </ScreenLayout>
        {bottomSheetIndex > -1 && (
          <CustomDrawer
            handleClose={() => {
              bottomSheetRef.current?.close();
              setBottomSheetIndex(-1);
            }}
            index={bottomSheetIndex}
            ref={bottomSheetRef}
            content={<SelectPoem />}
            title="Select Poem"
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};
