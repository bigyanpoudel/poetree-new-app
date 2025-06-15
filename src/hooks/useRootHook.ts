import {
  deletePoem,
  followUserApi,
  getCurrentUser,
  poemLikeApi,
  reportApi,
  unfollowUserApi,
} from "@/src/api/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Toast } from "toastify-react-native";
import { useAppProvider } from "../provider/appProvider";
import { appQuery } from "../utils/constant/appQuery";

export const useGetCurrentUser = () => {
  const { user } = useAppProvider();
  return useQuery({
    queryKey: [appQuery.getCurrentUser, user?._id],
    queryFn: () => getCurrentUser(user?._id as string),
    enabled: Boolean(user?._id) && Boolean(user),
  });
};
export const usePoemLike = () => {
  return useMutation({
    mutationFn: poemLikeApi,
    onSuccess: () => {},
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: followUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
      Toast.success("Follow User Success.");
    },
  });
};

export const useUnFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unfollowUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
      Toast.success("Unfollow User Success.");
    },
  });
};

export const useDeletePoem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePoem,
    onError: () => {
      Toast.error("Delete Poem Failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      Toast.success("Delete Poem Success");
    },
  });
};

export const useReport = () => {
  return useMutation({
    mutationFn: reportApi,
    onError: () => {
      Toast.error("Report Failed");
    },
    onSuccess: () => {},
  });
};
