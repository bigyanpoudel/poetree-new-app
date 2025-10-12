import { Button } from "@/src/components/button";
import { FastImageComponent } from "@/src/components/image";
import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import { AnthologyStatusEnum } from "@/src/types";
import classnames from "classnames";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useGetAnthologyDetails } from "../hooks";
import { AnthologyDetailShimmer } from "../components/anthologyDetailShimmer";
import { useAppProvider } from "@/src/provider/appProvider";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SubscriptionBottomSheet } from "@/src/features/subscription/components/SubscriptionBottomSheet";
import { useGetCurrentUser } from "@/src/hooks/useRootHook";
import { SubscriptionPlanSelector } from "../../subscription/components";
import { queryClient } from "@/src/lib/reactQuery";
import { appQuery } from "@/src/utils/constant/appQuery";
import { CustomDrawer } from "@/src/components/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import dayjs from "dayjs";


export const AnthologyDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAppProvider();
  const { data: currentUser } = useGetCurrentUser();
  const { data: anthology, isLoading, refetch, isRefetching } = useGetAnthologyDetails();
  const [bottomSheetIndex, setBottomSheetIndex] = React.useState<number>(-1);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Check if deadline has passed
  const isDeadlinePassed = anthology?.submissionDeadline
    ? dayjs().isAfter(dayjs(anthology.submissionDeadline))
    : false;

  // Determine actual status based on deadline
  const actualStatus = anthology?.status !== AnthologyStatusEnum.Completed && isDeadlinePassed
    ? AnthologyStatusEnum.Completed
    : anthology?.status;

  const handleReactivate = () => {
    setBottomSheetIndex(0);
    bottomSheetRef.current?.expand();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetIndex(-1);
    queryClient.invalidateQueries({
      queryKey: [appQuery.getCurrentUser]
    })
  };

  const getStatusColor = (status: AnthologyStatusEnum, isPassed: boolean) => {
    // If deadline passed or status is completed, show green
    if (status === AnthologyStatusEnum.Completed || isPassed) {
      return "bg-ui-success text-white";
    }
    // If ongoing and not passed, show orange
    if (status === AnthologyStatusEnum.Ongoing && !isPassed) {
      return "bg-orange-400 text-white";
    }
    switch (status) {
      case AnthologyStatusEnum.PUBLISHED:
        return "bg-purple-400 text-white";
      case AnthologyStatusEnum.CANCELLED:
        return "bg-red-400 text-white";
      case AnthologyStatusEnum.DRAFT:
        return "bg-yellow-400 text-yellow-800";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleParticipate = () => {
    // Check if user has an active subscription
    const hasActiveSubscription = currentUser?.subscription?.isSubscribed &&
      currentUser?.subscription?.subscriptionActive;

    if (!hasActiveSubscription) {
      // Show subscription modal if not subscribed
      handleReactivate()
      return;
    }

    // Navigate to the submit poem page if subscribed
    router.push(`/anthology/${id}/submit`);
  };



  const handleShare = () => {
    // TODO: Implement share functionality
    console.log("Share anthology:", anthology?.title);
  };

  return (
    <GestureHandlerRootView nativeID="modal">
    <ScreenLayout
      scafold={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        refreshControl: (
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        ),
      }}
      appBar={{
        title: "Anthology Details",
      }}
    >
      {isLoading ? (
        <AnthologyDetailShimmer />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
              {/* Hero Image */}
              <View className="relative">
                <FastImageComponent
                  source={anthology?.coverImage}
                  className="w-full h-64"
                />
                <View className="absolute top-4 right-4">
                  <View
                    className={classnames(
                      "px-3 py-1 rounded-sm",
                      getStatusColor(anthology?.status as any, isDeadlinePassed)
                    )}
                  >
                    <Text className="text-xs font-bold uppercase tracking-wider" fontWeight={700}>
                      {actualStatus}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Content */}
              <View className="p-6">
                {/* Title and Theme */}
                <Text className="text-2xl mb-2" fontWeight={700}>
                  {anthology?.title}
                </Text>

                <Text className="text-lg text-blue-600 mb-4" fontWeight={500}>
                  {anthology?.theme}
                </Text>

                {/* Details Section */}
                <View className="mb-6">
                  <Text className="text-lg mb-3" fontWeight={700}>
                    Details
                  </Text>

                  <View className="space-y-3">
                    {anthology?.submissionDeadline && <View className="flex-row justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <Text className="opacity-70" fontWeight={500}>Submission Deadline</Text>
                      <Text fontWeight={700}>{formatDate(anthology?.submissionDeadline)}</Text>
                    </View>
                    }
                    {anthology?.createdAt && <View className="flex-row justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <Text className="opacity-70" fontWeight={500}>Created</Text>
                      <Text fontWeight={700}>{formatDate(anthology?.createdAt)}</Text>
                    </View>}
                    {anthology?.status && <View className="flex-row justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <Text className="opacity-70" fontWeight={500}>Anthology Status</Text>
                      <Text fontWeight={700} className="uppercase">{anthology?.status}</Text>
                    </View>}
                    {anthology?.submitted !== undefined && (
                      <View className="flex-row justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <Text className="opacity-70" fontWeight={500}>Submission Status</Text>
                        <Text fontWeight={700} className={anthology.submitted ? "text-green-600" : "text-gray-600"}>
                          {anthology.submitted ? "Submitted" : "Not Submitted"}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>



                {/* Action Buttons */}
              {!anthology?.submitted && user?._id && <View className="space-y-3">
                  <Button
                    mode="contained"
                    onPress={handleParticipate}
                    className="w-full"
                    disabled={actualStatus === AnthologyStatusEnum.CANCELLED || actualStatus === AnthologyStatusEnum.Completed || isDeadlinePassed}
                  >
                    {actualStatus === AnthologyStatusEnum.Ongoing && !isDeadlinePassed ? "Participate" : "Submissions Closed"}
                  </Button>

                </View>}
              </View>
        </ScrollView>
      )}

        {/* Subscription Bottom Sheet */}
        {bottomSheetIndex > -1 && (
          <CustomDrawer
            handleClose={handleCloseBottomSheet}
            index={bottomSheetIndex}
            ref={bottomSheetRef}
            content={
              <SubscriptionPlanSelector
                handleClose={handleCloseBottomSheet}
                title="Choose Your Plan"
                description="Select a plan to unlock premium features and start monetizing your poetry"
                feature="premium features"
              />
            }
            title="Upgrade Your Plan"
          />
        )}
      </ScreenLayout>
    </GestureHandlerRootView>
  );
};