import { useInfiniteQuery } from "@tanstack/react-query";
import { getHomePlayListApi, searchPoemApi, searchUserApi } from "../api/search";
import { homeQuery } from "../../home/constant/query";
import { Obj } from "@/src/types";

export const useGetInfiniteSearchPost = ({ search }: { search: string }) => {
    const limit = 10;
    return useInfiniteQuery({
      queryKey: [homeQuery.searchPoemList, search],
      queryFn: ({ pageParam }) =>
        searchPoemApi({ pageParam: pageParam + 1, limit, search }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        
        if (lastPage?.currentPage < lastPage?.totalPages) {
          return lastPage?.currentPage; // Next page index
        }
        return undefined; // No more pages
      },
    });
  };
  
  export const useGetInfiniteSearchUser = ({ search }: { search: string }) => {
    const limit = 10;
    return useInfiniteQuery({
      queryKey: [homeQuery.searchUserList, search],
      queryFn: ({ pageParam }) =>
        searchUserApi({
          pageParam: pageParam + 1,
          limit,
          search: search?.replace(/#/g, ""),
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        
        if (lastPage?.currentPage < lastPage?.totalPages) {
          return lastPage?.currentPage; // Next page index
        }
        return undefined; // No more pages
      },
    });
  };
  
  export const useGetHomeInfinitePlayList = (params: Obj) => {
    const limit = 20;
    return useInfiniteQuery({
      queryKey: [homeQuery.getAllPlaylist, params],
      queryFn: ({ pageParam }) =>
        getHomePlayListApi({ page: pageParam + 1, limit, ...params }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.currentPage < lastPage?.totalPages) {
          return lastPage?.currentPage; // Next page index
        }
        return undefined; // No more pages
      },
    });
  };