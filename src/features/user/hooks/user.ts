import { getCurrentUser } from "@/src/api/app";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import {
  getUserFollowerListApi,
  getUserFollowingListApi,
  getUsersPoemApi,
} from "../api/user";
import { userQuery } from "../constant/query";

export const useGetUserProfile = () => {
  const { id } = useLocalSearchParams<{ id: string; slug: string }>();
  return useQuery({
    queryKey: [userQuery.getUserProfile, id],
    queryFn: () => getCurrentUser(id),
    enabled: Boolean(id),
  });
};

export const useGetInfiniteUserPoems = ({ userId }: { userId: string }) => {
  const limit = 10;
  return useInfiniteQuery({
    queryKey: [userQuery.getUserPoems, userId],
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
