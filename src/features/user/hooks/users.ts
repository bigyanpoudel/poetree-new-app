import { Obj } from "@/src/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPlayListApi } from "../api/user";
import { getUserListApi } from "../api/users";
import { userQuery } from "../constant/query";
import { IUserListRes } from "../types/users";

export const useGetInfiniteUsersList = ({ data }: { data: IUserListRes }) => {
  const limit = 20;
  return useInfiniteQuery({
    queryKey: [userQuery.getUsersList],
    queryFn: ({ pageParam }) =>
      getUserListApi({ pageParam: pageParam + 1, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
    initialData: {
      pages: [data],
      pageParams: [0],
    },
  });
};

export const useGetInfiniteUsersPlayList = (params: Obj) => {
  const limit = 20;
  return useInfiniteQuery({
    queryKey: [userQuery.getUserPlayList],
    queryFn: ({ pageParam }) =>
      getUserPlayListApi({ page: pageParam + 1, limit, params }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
  });
};
