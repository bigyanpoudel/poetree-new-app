import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { addCommentApi, deleteCommentApi, getAllPostCommentsApi, getPoemDetail, updatePoemViewCountApi } from "../api/poemDetail";
import { query } from "../constant/query";

export const useGetPoemDetails = (id?:string) => {
    return useQuery({
      queryKey: [query.getPoemDetails,id],
      queryFn: () => getPoemDetail(id as string),
      enabled: Boolean(id),
    });
  };
  
  export const useAddComments = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: addCommentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [query.getAllPoemComments, id],
        });
      },
    });
  };
  
  export const useDeleteComments = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteCommentApi,
      onSuccess: () => {
        Toast.success("Delete Comment Success.");
        queryClient.invalidateQueries({
          queryKey: [query.getAllPoemComments, id],
        });
      },
    });
  };
  
  export const useGetInfinitePostComments = ({ id }: { id: string }) => {
    const limit = 10;
    return useInfiniteQuery({
      queryKey: [query.getAllPoemComments, id],
      queryFn: ({ pageParam = 0 }) =>
        getAllPostCommentsApi({ pageParam: pageParam + 1, limit, id }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.currentPage < lastPage?.totalPages) {
          return lastPage?.currentPage + 1; // Next page index
        }
        return undefined; // No more pages
      },
    });
  };
  
  export const useUpdatePoemViewCount = ({ id }: { id: string }) => {
    return useQuery({
      queryKey: [query.updatePoemViewCount, id],
      queryFn: () => updatePoemViewCountApi(id),
      enabled: Boolean(id),
    });
  };