import { Button, Text } from "@/src/components";
import { CustomDrawer } from "@/src/components/drawer";
import { InputField } from "@/src/components/form/input";
import { SwitchField } from "@/src/components/form/swtich";
import { ScreenLayout } from "@/src/components/layout";
import { CustomDailog } from "@/src/components/modal/dailog";
import { useGetCurrentUser } from "@/src/hooks/useRootHook";
import { IAppPoem, Obj } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik, FormikHelpers, isEmptyArray } from "formik";
import React from "react";
import { Linking, Pressable, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import { PoemItem } from "../components/create-playlist/poemItem";
import { SelectPoem } from "../components/create-playlist/selectPoem";
import { PlaylistFileUploader } from "../components/create-playlist/uploader";
import { TagInputField } from "../components/create-poem/form/poemtags";
import {
  useConnectAccount,
  useCreatePlayList,
  useUpdatePlayList,
} from "../hooks/createPlaylist";
import { useGetPlaylistDetails } from "../hooks/palylistDetails";
import { SubscriptionPlanSelector } from "@/src/features/subscription/components";
import { queryClient } from "@/src/lib/reactQuery";
import { appQuery } from "@/src/utils/constant/appQuery";

export const CreatePlaylist = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [addedPoemList, setAddedPoemList] = React.useState<IAppPoem[]>([]);
  const [openConnectAccount, setOpenConnectAccount] =
    React.useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [bottomSheetIndex, setBottomSheetIndex] = React.useState<number>(-1);
  const subscriptionBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [subscriptionBottomSheetIndex, setSubscriptionBottomSheetIndex] = React.useState<number>(-1);
  const createPlaylist = useCreatePlayList();
  const playlistDetail = useGetPlaylistDetails(id);
  const updatePlaylist = useUpdatePlayList();
  const cureentUser = useGetCurrentUser();
  const connectAccount = useConnectAccount();

  const handleCloseSubscriptionBottomSheet = () => {
    subscriptionBottomSheetRef.current?.close();
    setSubscriptionBottomSheetIndex(-1);
    queryClient.invalidateQueries({
      queryKey: [appQuery.getCurrentUser]
    });
  };

  React.useEffect(() => {
    if (cureentUser.data && !cureentUser.data.isStripeCardAdded) {
      setOpenConnectAccount(true);
    }
  }, [cureentUser.data]);
  React.useEffect(() => {
    if (playlistDetail.data?.poems && playlistDetail.data?.poems.length > 0) {
      setAddedPoemList(playlistDetail.data.poems);
    }
  }, [playlistDetail.data]);
  const handleSavePlaylist = async (
    values: Obj,
    formHelper: FormikHelpers<any>
  ) => {
    if (isEmptyArray(addedPoemList)) {
      Toast.error("Please add atleast one poem to the list.");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("status", values.status);

    if (values?.tags && values?.tags?.length > 0) {
      values?.tags.forEach((item: string, index: number) => {
        formData.append(`hashTags[${index}]`, item);
      });
    }
    addedPoemList.forEach((item, index) => {
      formData.append(`poems[${index}]`, item._id);
    });
    if (values?.file) {
      const file: any = {
        uri: values?.file.uri,
        type: values?.file.mimeType,
        name: values?.file.name,
      };
      formData.append("thumbnail", file);
    }
    if (!playlistDetail.data?._id) {
      const res = await createPlaylist.mutateAsync(formData);
      if (res) {
        formHelper.resetForm();
        setAddedPoemList([]);
      }
    } else {
      await updatePlaylist.mutateAsync({
        data: formData,
        id: playlistDetail.data._id,
      });
    }
  };
  return (
    <GestureHandlerRootView nativeID="modal">
      <Formik
        initialValues={{
          title: playlistDetail?.data?.title ?? "",
          price: playlistDetail?.data?.price?.toString() ?? "0",
          tags: playlistDetail?.data?.hashTags?.map((item) => item.name) ?? [],
          tag: "",
          file: null,
          poems: [],
          status: playlistDetail?.data?.status ?? true,
        }}
        // validationSchema={{}}
        enableReinitialize
        onSubmit={handleSavePlaylist}
      >
        {({ handleSubmit }) => (
          <View className="flex flex-1 relative">
            <ScreenLayout
              appBar={{
                title: "Create Playlist",
              }}
            >
              <View className="flex relative flex-col gap-4">
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
                  name="status"
                  label="Status"
                />
                <TagInputField
                  name="tag"
                  label="Tags"
                  placeholder={"Enter poem tag"}
                />
                <PlaylistFileUploader
                  label={"Select Plyalist Thumbnail"}
                  name="file"
                  defaultValue={playlistDetail.data?.thumbnail}
                />
                <View className="flex flex-col flex-1 gap-2">
                  <Text className="text-lg pl-2">Select Playlist Poem</Text>
                  <Pressable
                    onPress={() => {
                      setBottomSheetIndex(0);
                      bottomSheetRef.current?.expand();
                    }}
                    className="w-full"
                  >
                    <View
                      style={{
                        height: 48,
                        width: "100%",
                      }}
                      className="dark:bg-darker-100  flex justify-center flex-1  px-3 bg-darker-200"
                    >
                      <Text>Please Select Poem</Text>
                    </View>
                  </Pressable>
                </View>
                {addedPoemList.map((poem, index) => (
                  <PoemItem
                    sn={index + 1}
                    key={poem._id}
                    title={poem.title}
                    onPress={() => {
                      const data = [...addedPoemList];
                      const index = data.findIndex(
                        (record) => poem._id === record._id
                      );
                      if (index > -1) {
                        data.splice(index, 1);
                        setAddedPoemList(data);
                      }
                    }}
                  />
                ))}
              </View>
            </ScreenLayout>
            <View
              style={{
                paddingBottom: insets.bottom + 8,
                backgroundColor: true
                  ? Colors.light.primary
                  : Colors.dark.primary,
              }}
              className="fixed px-5 pt-3 bottom-0 left-0 w-full z-[1] "
            >
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
                loading={createPlaylist.isPending || updatePlaylist.isPending}
              >
                {id ? "Update Playlist" : "Save Playlist"}
              </Button>
            </View>
            {bottomSheetIndex > -1 && (
              <CustomDrawer
                handleClose={() => {
                  bottomSheetRef.current?.close();
                  setBottomSheetIndex(-1);
                }}
                index={bottomSheetIndex}
                ref={bottomSheetRef}
                content={
                  <SelectPoem
                    poems={addedPoemList}
                    setSelectedPoem={(poems) => {
                      setAddedPoemList((prev) => [...prev, poems]);
                    }}
                  />
                }
                title="Select Poem"
              />
            )}
            {subscriptionBottomSheetIndex > -1 && (
              <CustomDrawer
                handleClose={handleCloseSubscriptionBottomSheet}
                index={subscriptionBottomSheetIndex}
                ref={subscriptionBottomSheetRef}
                content={
                  <SubscriptionPlanSelector
                    handleClose={handleCloseSubscriptionBottomSheet}
                    title="Choose Your Plan"
                    description="Select a plan to unlock premium features and start monetizing your poetry"
                    feature="premium features"
                  />
                }
                title="Upgrade Your Plan"
              />
            )}
          </View>
        )}
      </Formik>
      <CustomDailog
        visible={openConnectAccount}
        onClose={() => {
          setOpenConnectAccount(false);
          router.back();
        }}
        onConfirm={async () => {
          const res: any = await connectAccount.mutateAsync();
          if (res?.accountLink) {
            Linking.openURL(res?.accountLink).catch((err) => {
              console.error("Failed to open URL:", err);
            });
          }
        }}
        okText="Connect Account"
        isLoading={connectAccount.isPending}
        title="Setup Payouts To Recieve Payments"
        content={
          "To create the playlist, please setup payouts to recive payments with stripe. This information will only be used for the secure processing of your payment and will not be shared with any third parties. For any issues, please contact our support team at [support@example.com]"
        }
      />
    </GestureHandlerRootView>
  );
};
