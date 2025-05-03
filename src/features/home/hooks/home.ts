import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllFeedPoemApi, getAllPoemApi } from "../api/home";

export const useGetInfinitePost = () => {
  const limit = 10;
  return useInfiniteQuery({
    queryKey: ["GET_HOME_ALL_POEM"],
    queryFn: ({ pageParam }) =>
      getAllPoemApi({ pageParam: pageParam + 1, limit }),
    initialPageParam: 0,
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
    queryKey: ["GET_HOME_FEED_POEM"],
    queryFn: ({ pageParam }) =>
      getAllFeedPoemApi({ pageParam: pageParam + 1, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
  });
};
