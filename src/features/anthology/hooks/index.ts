import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Toast } from "toastify-react-native";
import { getAnthologyDetailsApi, getPublicAnthologiesApi, submitPoemApi } from "../api";
import { getUserSubmissionsApi } from "../api/submissions";
import { anthologyQuery } from "../constant/query";

export const useGetPublicAnthologies = ({
  search,
  limit = 12,
}: {
  search?: string;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: [anthologyQuery.getPublicAnthologies, search, limit],
    queryFn: ({ pageParam = 1 }) =>
      getPublicAnthologiesApi({
        pageParam: pageParam + 1,
        limit,
        search,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage; // Next page index
      }
      return undefined; // No more pages
    },
  });
};

export const useGetAnthologyDetails = () => {
  const {  id } = useLocalSearchParams<{ id: string; name: string }>();
  return useQuery({
    queryKey: [anthologyQuery.getAnthologyDetails, id],
    queryFn: () => getAnthologyDetailsApi(id),
    enabled: !!id,
  });
};

export const useSubmitPoem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: submitPoemApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [anthologyQuery?.getAnthologyDetails],
        });
        queryClient.invalidateQueries({
          queryKey: [anthologyQuery?.getUserSubmissions],
        });
        Toast.success("Submission successful! Your poem is under review.")
      },
    });
  };

  export const useGetUserSubmission = ({
    limit = 12,
  }: {
    limit?: number;
  }) => {
    return useInfiniteQuery({
      queryKey: [anthologyQuery.getUserSubmissions, limit],
      queryFn: ({ pageParam = 1 }) =>
        getUserSubmissionsApi({
          pageParam: pageParam + 1,
          limit,
          
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage: any) => {
        if (lastPage?.currentPage < lastPage?.totalPages) {
          return lastPage?.currentPage; // Next page index
        }
        return undefined; // No more pages
      },
    });
  };
  