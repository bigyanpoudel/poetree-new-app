import { Button } from "@/src/components/button";
import { Text } from "@/src/components/text";
import { PurchaseStatusEnum } from "@/src/types";
import { useRouter } from "expo-router";
import React from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Avatar, Chip } from "react-native-paper";
import { IPurchase } from "../types/accountSetting";
import { getAccountFormatter } from "@/src/utils/currency";

interface MyPurchaseItemProps {
  purchase: IPurchase;
}

export const MyPurchaseItem: React.FC<MyPurchaseItemProps> = ({ purchase }) => {
  const router = useRouter();

  const getStatusColor = (status: PurchaseStatusEnum) => {
    switch (status) {
      case PurchaseStatusEnum.paid:
        return "#22c55e";
      case PurchaseStatusEnum.pending:
        return "#f59e0b";
      case PurchaseStatusEnum.failed:
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: PurchaseStatusEnum) => {
    switch (status) {
      case PurchaseStatusEnum.paid:
        return "Paid";
      case PurchaseStatusEnum.pending:
        return "Pending";
      case PurchaseStatusEnum.failed:
        return "Failed";
      default:
        return "Unknown";
    }
  };

  const handleViewPlaylist = () => {
    router.push(`/playlist/${purchase.playlistId._id}?slug=${purchase.playlistId.slug}`);
  };

  const handleDownloadInvoice = async () => {
    if (purchase.invoiceUrl) {
      try {
        await Linking.openURL(purchase.invoiceUrl);
      } catch (error) {
        console.error("Failed to open invoice URL:", error);
      }
    }
  };

  return (
    <View className="flex flex-col p-4 px-5 gap-3 dark:bg-darker-100 bg-white/90">
      {/* Header with Playlist Info */}
      <View className="flex flex-row items-start mb-3">
        <TouchableOpacity onPress={handleViewPlaylist} className="flex-1">
          <View className="flex flex-row items-center gap-3">
            {purchase.playlistId.thumbnail ? (
              <Avatar.Image
                size={50}
                source={{ uri: purchase.playlistId.thumbnail }}
                className="rounded-full"
              />
            ) : (
              <Avatar.Text
                size={50}
                label={purchase.playlistId.title?.charAt(0) ?? "P"}
                labelStyle={{ fontSize: 18, color: "white" }}
                className="dark:bg-black/50 bg-darkBackground rounded-lg"
              />
            )}
            <View className="flex-1">
              <Text
                className="text-lg font-semibold text-text-300 dark:text-white"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {purchase.playlistId.title}
              </Text>
              <Text className="text-sm text-text-100 dark:text-text-100">
                {purchase.poems.length} poem{purchase.poems.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <Chip
          textStyle={{
            color: "white",
            fontSize: 12,
            fontWeight: "600"
          }}
          style={{
            backgroundColor: getStatusColor(purchase.status),
            borderRadius: 6,
          }}
        >
          {getStatusText(purchase.status)}
        </Chip>
      </View>

      {/* Purchase Details */}
      <View className="flex flex-row justify-between items-center mb-3">
        <View>
          <Text className="text-sm text-text-100 dark:text-text-100">
            Amount
          </Text>
          <Text className="text-lg font-semibold text-text-300 dark:text-white">
              {getAccountFormatter(purchase?.playlistId?.price ?? 0)}
          </Text>
        </View>
        <View>
          <Text className="text-sm text-text-100 dark:text-text-100">
            Purchase Date
          </Text>
          <Text className="text-sm font-medium text-text-300 dark:text-white">
            {/* {getCreatedDate(purchase.createdAt)} */}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex flex-row flex-1 justify-end gap-3">
        <Button
          mode="contained"
          onPress={handleViewPlaylist}
       
        >
          View
        </Button>
        
        {purchase.invoiceUrl && (
          <Button
            mode="outlined"
            onPress={handleDownloadInvoice}
            className="flex-1 bg-blue-dark dark:bg-darker-100"
          >
            Download Invoice
          </Button>
        )}
      </View>
    </View>
  );
};