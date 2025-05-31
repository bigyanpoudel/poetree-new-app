import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useLocalSearchParams } from "expo-router";
import { Toast } from "toastify-react-native";
import {
  addCommentApi,
  deleteCommentApi,
  getAllPostCommentsApi,
  getPlaylistDetailApi,
  playlistLikeApi,
  puchasePlaylistApi,
} from "../api/playlistDetails";
import { query } from "../constant/query";

export const useGetPlaylistDetails = (id:string) => {
  return useQuery({
    queryKey: [query.getPlaylistDetails, id],
    queryFn: () => getPlaylistDetailApi(id as string),
    enabled: Boolean(id),
  });
};

export const usePlaylistLike = () => {
  return useMutation({
    mutationFn: playlistLikeApi,
  });
};

export const useAddPlaylistComments = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [query.getAllPlaylistComments, id],
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
        queryKey: [query.getAllPlaylistComments, id],
      });
    },
  });
};

export const useGetInfinitePlaylistComments = ({ id }: { id: string }) => {
  const limit = 10;
  return useInfiniteQuery({
    queryKey: [query.getAllPlaylistComments, id],
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

export const usePurchasePlaylist = () => {
  return useMutation({
    mutationFn: puchasePlaylistApi,
    onSuccess: (data: any) => {
      if (data.puhcaseUrl) {
        window.open(data.puhcaseUrl);
      }
    },
  });
};
