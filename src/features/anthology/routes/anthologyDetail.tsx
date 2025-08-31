import { Button } from "@/src/components/button";
import { FastImageComponent } from "@/src/components/image";
import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import { AnthologyStatusEnum } from "@/src/types";
import classnames from "classnames";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useGetAnthologyDetails } from "../hooks";
import { AnthologyDetailShimmer } from "../components/anthologyDetailShimmer";


export const AnthologyDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: anthology, isLoading, refetch, isRefetching } = useGetAnthologyDetails();
  

  const getStatusColor = (status: AnthologyStatusEnum) => {
    switch (status) {
      case AnthologyStatusEnum.Ongoing:
        return "bg-green-400 text-green-800";
      case AnthologyStatusEnum.Completed:
        return "bg-blue-400 text-blue-800";
      case AnthologyStatusEnum.PUBLISHED:
        return "bg-purple-400 text-purple-800";
      case AnthologyStatusEnum.CANCELLED:
        return "bg-red-400 text-red-800";
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
    // Navigate to the submit poem page
    router.push(`/anthology/${id}/submit`);
  };


  const handleShare = () => {
    // TODO: Implement share functionality
    console.log("Share anthology:", anthology?.title);
  };

  return (
    
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
                "px-3 py-1 rounded-full",
                getStatusColor(anthology?.status as any)
              )}
            >
              <Text className="text-xs font-medium capitalize" fontWeight={500}>
                {anthology?.status}
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
            {anthology?.submissionDeadline &&  <View className="flex-row justify-between py-2 border-b border-gray-200 dark:border-gray-700">
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
         {!anthology?.submitted && <View className="space-y-3">
            <Button
              mode="contained"
              onPress={handleParticipate}
              className="w-full"
              disabled={anthology?.status === AnthologyStatusEnum.CANCELLED || anthology?.status === AnthologyStatusEnum.Completed}
            >
              {anthology?.status === AnthologyStatusEnum.Ongoing ? "Participate" : "View Details"}
            </Button>
           
          </View>}
        </View>
        </ScrollView>
      )}
    </ScreenLayout>
  );
};