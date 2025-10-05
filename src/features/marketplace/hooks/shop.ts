import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPlayListApi } from "../api/shop";
import { query } from "../constant/query";
import { Obj } from "@/src/types";

export const useGetTrendingPlaylist = () => {
  return useQuery({
    queryKey: [query.getTrendingPlaylist],
    queryFn: () => getPlayListApi({ sort: "TRENDING" }),
  });
};

export const useGetLatestPlaylist = () => {
  return useQuery({
    queryKey: [query.getTrendingPlaylist],
    queryFn: () => getPlayListApi({}),
  });
};

export const useGetInfinitePlayList = (params: Obj) => {
  const limit = 20;
  return useInfiniteQuery({
    queryKey: [query.getAllPlaylist],
    queryFn: ({ pageParam }) =>
      getPlayListApi({ page: pageParam + 1, limit, params }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
  });
};
