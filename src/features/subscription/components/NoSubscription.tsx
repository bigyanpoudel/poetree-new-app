import { CustomDrawer } from "@/src/components/drawer";
import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { RefreshControl, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { SubscriptionPlanSelector } from "./SubscriptionPlanSelector";
import { queryClient } from "@/src/lib/reactQuery";
import { appQuery } from "@/src/utils/constant/appQuery";

export const NoSubscription = () => {
  const isDark = useIsDarkTheme();
  const [bottomSheetIndex, setBottomSheetIndex] = React.useState<number>(-1);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

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

  return (
    <GestureHandlerRootView nativeID="modal">
      <ScreenLayout
        appBar={{
          title: "Subscription",
        }}
        scafold={{
          refreshControl: (
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                queryClient.invalidateQueries({
                  queryKey: [appQuery.getCurrentUser]
                })
              }}
            />
          ),
        }}
      >
        <View
          className="flex-1 justify-center items-center px-5"
          style={{
            backgroundColor: isDark
              ? Colors.dark.scafoldColor
              : Colors.light.scafoldColor,
          }}
        >
          <Text className="text-xl mb-2 text-center" fontWeight={800}>
            No Active Subscription
          </Text>
          <Text className="text-center opacity-70 mb-6">
            You don't have an active subscription. Subscribe to unlock premium
            features.
          </Text>
          <Button
            mode="contained"
            className="w-full"
            onPress={handleReactivate}
            style={{
              backgroundColor: isDark ? "#fff" : "#000",
            }}
            labelStyle={{
              color: isDark ? "#000" : "#fff",
            }}
          >
            View Plans
          </Button>
        </View>
        {/* Subscription Bottom Sheet */}

      </ScreenLayout>
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
    </GestureHandlerRootView>
  );
};
