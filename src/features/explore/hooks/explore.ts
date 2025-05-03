import { useInfiniteQuery } from "@tanstack/react-query";
import { exploreQuery } from "../constant/query";
import { getPoemHashTagsApi, getUserListApi } from "../api/explore";

export const useGetInfiniteHasTagsPost = () => {
    const limit = 50;
    return useInfiniteQuery({
      queryKey: [exploreQuery.getPoemHashTags],
      queryFn: ({ pageParam }) =>
        getPoemHashTagsApi({ pageParam: pageParam + 1, limit }),
      initialPageParam: 0,
      getNextPageParam: (lastPage:any) => {
        
        if (lastPage?.currentPage < lastPage?.totalPages) {
          return lastPage?.currentPage; // Next page index
        }
        return undefined; // No more pages
      },
    });
};
  
export const useGetInfiniteUsersList = () => {
    const limit = 30;
    return useInfiniteQuery({
      queryKey: [exploreQuery.getUsersList],
      queryFn: ({ pageParam }) =>
        getUserListApi({ pageParam: pageParam + 1, limit }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        
        if (lastPage?.currentPage < lastPage?.totalPages) {
          return lastPage?.currentPage; // Next page index
        }
        return undefined; // No more pages
      },
    
    });
  };
  