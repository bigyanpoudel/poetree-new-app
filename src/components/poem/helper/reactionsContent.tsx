import { Text } from "@/src/components/text";
import { useGetPostReactions } from "@/src/hooks/useRootHook";
import { POEMREACTION, PostReactionDto } from "@/src/types";
import { REACTION_IMAGE } from "@/src/utils/constant/appConstant";
import { formatPoemNumber } from "@/src/utils/poem";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";

interface IReactionsContentProps {
  postId: string;
  isActive: boolean;
}

interface IReactionTabProps {
  label: string;
  count?: number;
  icon?: any;
  isActive: boolean;
  onPress: () => void;
}

const ReactionTab: React.FC<IReactionTabProps> = ({
  label,
  count,
  icon,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-3 py-2 flex-row items-center gap-2 border-b-2 ${
        isActive ? "border-primary" : "border-transparent"
      }`}
    >
      {icon && <Image source={{ uri: icon }} className="w-5 h-5" />}
      <Text
        className={`text-sm ${
          isActive
            ? "font-semibold dark:text-darkTextColor"
            : "dark:text-gray-400"
        }`}
      >
        {label}
      </Text>
      {count !== undefined && (
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {formatPoemNumber(count)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

interface IReactionListProps {
  postId: string;
  reactionType?: string;
  isActive: boolean;
}

const ReactionList: React.FC<IReactionListProps> = ({
  postId,
  reactionType,
  isActive,
}) => {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [reactions, setReactions] = React.useState<PostReactionDto[]>([]);
  const [hasMore, setHasMore] = React.useState(true);

  const { data, isLoading, isFetching } = useGetPostReactions({
    postId,
    page,
    limit: 20,
    type: reactionType,
    enabled: isActive,
  });

  React.useEffect(() => {
    if (data?.reactions) {
      if (page === 1) {
        setReactions(data.reactions);
      } else {
        setReactions((prev) => [...prev, ...data.reactions]);
      }
      setHasMore(data.hasNextPage);
    }
  }, [data]);

  React.useEffect(() => {
    // Always reset when isActive changes (both open and close)
    setPage(1);
    setReactions([]);
    setHasMore(true);
  }, [isActive]);

  React.useEffect(() => {
    // Reset when reaction type changes, but only set page to 1
    // Don't clear reactions here - let the data effect handle it
    setPage(1);
  }, [reactionType]);

  const loadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  const renderReaction = ({ item }: { item: PostReactionDto }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(
          `/user/${item.reactedBy._id}?slug=${item.reactedBy.slug ?? item.reactedBy._id}`
        );
      }}
      className="flex-row items-center justify-between py-3"
    >
      <View className="flex-row items-center gap-3 flex-1">
        {item.reactedBy.photo ? (
          <Avatar.Image
            size={40}
            source={{ uri: item.reactedBy.photo }}
            className="w-10 h-10"
          />
        ) : (
          <Avatar.Text
            size={40}
            label={item.reactedBy.name?.charAt(0) ?? ""}
            labelStyle={{
              fontSize: 16,
              color: "white",
            }}
            className="dark:bg-black/50 bg-darkBackground"
          />
        )}
        <Text
          numberOfLines={1}
          className="font-semibold text-base flex-1 dark:text-darkTextColor"
        >
          {item.reactedBy.name}
        </Text>
      </View>
      <Image
        source={{ uri: REACTION_IMAGE[item.type] }}
        className="w-5 h-5"
      />
    </TouchableOpacity>
  );

  if (isLoading && page === 1) {
    return (
      <View className="flex-1 justify-center items-center py-10">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (reactions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-10">
        <Text className="text-gray-500 dark:text-gray-400">
          No reactions yet
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reactions}
      renderItem={renderReaction}
      keyExtractor={(item, index) => `${item._id}-${index}`}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetching ? (
          <View className="py-4">
            <ActivityIndicator size="small" />
          </View>
        ) : null
      }
      style={{ maxHeight: 500 }}
    />
  );
};

export const ReactionsContent: React.FC<IReactionsContentProps> = ({
  postId,
  isActive,
}) => {
  const [activeTab, setActiveTab] = React.useState<string>("all");

  const { data: countsData, isLoading: countsLoading } = useGetPostReactions({
    postId,
    page: 1,
    limit: 1,
    enabled: isActive,
  });

  React.useEffect(() => {
    if (isActive) {
      setActiveTab("all");
    }
  }, [isActive]);

  const tabItems = [
    {
      key: "all",
      label: "All",
      count: countsData?.totalReactions,
    },
    {
      key: POEMREACTION.LIKE,
      label: "Like",
      icon: REACTION_IMAGE[POEMREACTION.LIKE],
      count: countsData?.reactionCounts?.like,
    },
    {
      key: POEMREACTION.LOVE,
      label: "Love",
      icon: REACTION_IMAGE[POEMREACTION.LOVE],
      count: countsData?.reactionCounts?.love,
    },
    {
      key: POEMREACTION.LAUGH,
      label: "Haha",
      icon: REACTION_IMAGE[POEMREACTION.LAUGH],
      count: countsData?.reactionCounts?.haha,
    },
    {
      key: POEMREACTION.SAD,
      label: "Sad",
      icon: REACTION_IMAGE[POEMREACTION.SAD],
      count: countsData?.reactionCounts?.sad,
    },
    {
      key: POEMREACTION.WOW,
      label: "Wow",
      icon: REACTION_IMAGE[POEMREACTION.WOW],
      count: countsData?.reactionCounts?.wow,
    },
    {
      key: POEMREACTION.ANGRY,
      label: "Angry",
      icon: REACTION_IMAGE[POEMREACTION.ANGRY],
      count: countsData?.reactionCounts?.angry,
    },
  ];

  if (countsLoading) {
    return (
      <View className="py-10 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mb-4"
      >
        {tabItems.map((tab) => (
          <ReactionTab
            key={tab.key}
            label={tab.label}
            count={tab.count}
            icon={tab.icon}
            isActive={activeTab === tab.key}
            onPress={() => setActiveTab(tab.key)}
          />
        ))}
      </ScrollView>
      <ReactionList
        postId={postId}
        reactionType={activeTab === "all" ? undefined : activeTab}
        isActive={isActive}
      />
    </>
  );
};
