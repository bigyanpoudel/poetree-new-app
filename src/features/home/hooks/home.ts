import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllFeedPoemApi, getAllPoemApi } from "../api/home";

export const useGetInfinitePost = () => {
  const limit = 10;
  return useInfiniteQuery({
    queryKey: ["GET_HOME_ALL_POEM", { limit }],
    queryFn: ({ pageParam }) =>
      getAllPoemApi({ pageParam: pageParam + 1, limit }),
    initialPageParam: 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    getNextPageParam: (lastPage: any) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
  });
};

export const useGetInfiniteUserFeedPost = () => {
  const limit = 10;
  return useInfiniteQuery({
    queryKey: ["GET_HOME_FEED_POEM", { limit }],
    queryFn: ({ pageParam }) =>
      getAllFeedPoemApi({ pageParam: pageParam + 1, limit }),
    initialPageParam: 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    getNextPageParam: (lastPage: any) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
  });
};
