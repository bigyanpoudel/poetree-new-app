import { SectionHeading } from "@/src/components/section";
import { UserProfileCard } from "@/src/components/user/userCard";
import { UserProfileCardShimmer } from "@/src/components/user/userCard.shimmer";
import React from "react";
import { View } from "react-native";
import { useGetInfiniteUsersList } from "../../hooks/explore";

export const UserSection = () => {
  const { data,isLoading } = useGetInfiniteUsersList();
    const users = data?.pages.flatMap((page: any) => page?.data) || [];
    console.log(users, "users");
  return (
    <View className="flex flex-col gap-3">
      <SectionHeading title="Users" onPress={() => {}} />
          <View className="px-5 flex flex-col gap-4">
              {
                 isLoading &&   [...Array(2)].map((_, i) => (
                                 <UserProfileCardShimmer key={i} />
                               ))
              }
        {users?.map((user) => {
          return <UserProfileCard user={user} key={user?._id} />;
        })}
      </View>
    </View>
  );
};
