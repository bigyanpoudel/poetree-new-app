import { Text } from "@/src/components";
import { CustomDailog } from "@/src/components/modal/dailog";
import { useDeleteComments } from "@/src/features/poem/hooks/palylistDetails";
import { IComment } from "@/src/features/poem/types/poemDetail";
import { first } from "@/src/utils/common";
import { getCreatedDate } from "@/src/utils/poemDateFormat";
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

interface ICommentItem {
  comment: IComment;
  poemId: string;
}

export const CommentItem: React.FC<ICommentItem> = ({ comment, poemId }) => {
  const [openDailog, setOpenDailog] = React.useState<boolean>(false);
  console.log("coment", comment.commentedBy);
  const user = first(comment.commentedBy);
  const deleteComment = useDeleteComments(poemId);
  return (
    <>
      <View className={"flex flex-row gap-3 flex-1 items-start"}>
        {/* Avatar */}

        <Link href={`/user/${user?._id}?slug=${user?.slug}`}>
          {user?.photo ? (
            <Avatar.Image
              size={32}
              source={{ uri: user?.photo }}
              className="w-[32px] h-[32px] rounded-full border border-ui-border dark:border-ui-border/20"
            />
          ) : (
            <Avatar.Text
              size={32}
              label={user?.name?.charAt(0) ?? ""}
              labelStyle={{
                fontSize: 16,
                color: "white",
              }}
              className="dark:bg-black/50 bg-darkBackground "
            />
          )}
        </Link>

        {/* Comment Content */}
        <View className={"flex flex-col flex-1 gap-[3px]"}>
          <View
            className={
              "flex flex-col  w-full rounded-md bg-secondary-0 dark:bg-darker-100 bg-white p-2"
            }
          >
            <Link href={`/user/${user?._id}?slug=${user?.slug}`}>
              <Text
                fontWeight={600}
                className={
                  "text-base font-medium dark:text-white text-ligtTextColor"
                }
              >
                {user?.name ?? ""}
              </Text>
            </Link>
            <Text
              className={
                "text-base font-normal mb-0 dark:text-white/80 text-ligtTextColor/80"
              }
            >
              {comment.text}
            </Text>
          </View>

          {/* Comment Metadata */}
          <View className={"px-2 flex flex-row gap-3 items-center"}>
            <Text className={"text-xs"}>
              {getCreatedDate(comment.createdAt)}
            </Text>

            {/* Delete Button (Visible only to the comment owner) */}
            <TouchableOpacity
              onPress={() => {
                setOpenDailog(true);
              }}
              disabled={deleteComment.isPending}
              className=" px-2"
            >
              <Text className="font-semibold text-sm">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <CustomDailog
        visible={openDailog}
        onClose={() => {
          setOpenDailog(false);
        }}
        onConfirm={() => {
          deleteComment.mutate({
            postId: poemId,
            id: comment.id,
          });
        }}
        isLoading={deleteComment.isPending}
        title="Are you sure you want to delete this?"
        content={
          "This action cannot be undone. This will permanently delete the comment."
        }
      />
    </>
  );
};
