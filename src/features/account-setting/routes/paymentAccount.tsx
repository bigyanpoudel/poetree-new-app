import { APPICONS } from "@/assets/icons";
import { Button, Text } from "@/src/components";
import { ScreenLayout } from "@/src/components/layout";
import React from "react";
import { View } from "react-native";
import {} from "@/src/components";
export const PaymentAccount = () => {
  return (
    <ScreenLayout
      appBar={{
        title: "Payment Account",
      }}
    >
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-3 py-1">
          <View className="flex flex-row items-center justify-between gap-3">
            <Text className="text-base" fontWeight={600}>
              Your Payment Account
            </Text>
            <Button mode="contained" onPress={() => {}} className="py-0">
              Add New Account
            </Button>
          </View>
          <Text className="text-sm">
            Connect your payment account with Stripe to securely receive and
            manage your payments.
          </Text>
        </View>
        <View className="relative  flex flex-row h-[200px] ">
          <APPICONS.PaymentCardIcon
            width={"100%"}
            className="w-full h-[200px]"
          />
          <View className="absolute left-0 top-0 px-16 pt-10 pb-8 h-full w-full flex flex-col justify-between z-10">
            <Text className="text-lg font-semibold text-white">{"N/A"}</Text>
            <View className="flex flex-col gap-1">
              <Text className="text-base font-semibold text-white">
                {"N/A"}
              </Text>

              <View className="flex flex-row items-center gap-2">
                {Array.from({ length: 3 }).map((_, groupIndex) => (
                  <View key={groupIndex} className="flex flex-row gap-1">
                    {Array.from({ length: 4 }).map((_, dotIndex) => (
                      <View
                        key={`${groupIndex}-${dotIndex}`}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    ))}
                  </View>
                ))}

                <Text className="text-lg ">{"123"}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};
