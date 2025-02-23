import { Button, Text } from "@/src/components";
import { TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

interface ICommentItem {}

export const CommentItem: React.FC<ICommentItem> = ({}) => {
  return (
    <View className={"flex flex-row gap-3 flex-1 items-start"}>
      {/* Avatar */}
      <Avatar.Text
        size={32}
        label="XD"
        labelStyle={{
          fontSize: 16,
          color: "white",
        }}
        className="dark:bg-black/50 bg-darkBackground "
      />

      {/* Comment Content */}
      <View className={"flex flex-col flex-1 gap-[3px]"}>
        <View
          className={
            "flex flex-col gap-[2px] w-full rounded-md bg-secondary-0 dark:bg-[#3a3b3c] bg-neutral-200 p-2"
          }
        >
          <Text className={"text-sm font-medium dark:text-white text-black"}>
            UserName
          </Text>
          <Text className={"text-sm font-normal mb-0 dark:text-secondary-0"}>
            This is comments
          </Text>
        </View>

        {/* Comment Metadata */}
        <View className={"px-2 flex flex-row gap-3 items-center"}>
          <Text className={"text-xs "}>12 July 2023</Text>

          {/* Delete Button (Visible only to the comment owner) */}
          <TouchableOpacity className=" px-2">
            <Text className="font-semibold text-sm">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
