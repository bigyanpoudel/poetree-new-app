import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { userQuery } from "../constant/query";
import { getCurrentUser } from "@/src/api/app";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getUserFollowerListApi,
  getUserFollowingListApi,
  getUsersPoemApi,
} from "../api/user";

export const useGetUserProfile = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  return useQuery({
    queryKey: [userQuery.getUserProfile],
    queryFn: () => getCurrentUser(id),
    enabled: Boolean(id),
  });
};

export const useGetInfiniteUserPoems = ({ userId }: { userId: string }) => {
  const limit = 10;
  return useInfiniteQuery({
    queryKey: [userQuery.getUserPoems],
    queryFn: ({ pageParam = 0 }) =>
      getUsersPoemApi({ pageParam: pageParam + 1, limit, userId: userId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
    enabled: Boolean(userId),
  });
};

export const useGetUserFollowingList = ({ userId }: { userId: string }) => {
  const limit = 10;
  return useInfiniteQuery({
    queryKey: [userQuery.getUsersFollowingList, userId],
    queryFn: ({ pageParam = 0 }) =>
      getUserFollowingListApi({
        pageParam: pageParam + 1,
        limit,
        userId: userId,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
    enabled: Boolean(userId),
  });
};

export const useGetUserFollowerList = ({ userId }: { userId: string }) => {
  const limit = 10;
  return useInfiniteQuery({
    queryKey: [userQuery.getUsersFollowerList, userId],
    queryFn: ({ pageParam = 0 }) =>
      getUserFollowerListApi({
        pageParam: pageParam + 1,
        limit,
        userId: userId,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
    enabled: Boolean(userId),
  });
};
