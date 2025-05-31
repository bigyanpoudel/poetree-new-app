import { Obj } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import {
  connectBankAccountApi,
  createPlayListApi,
  getUsersPoemListApi,
  updatePlayListApi,
} from "../api/createPlaylist";
import { query } from "../constant/query";

export const useGetPoemSelectOption = (params: Obj) => {
  return useQuery({
    queryKey: [query.getPoemSelectOption, params],
    queryFn: () => getUsersPoemListApi(params),
  });
};

export const useCreatePlayList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlayListApi,
    onError: () => {
      Toast.error("Create Playlist Failed.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      Toast.success("Create Playlist Success.");
    },
  });
};

export const useUpdatePlayList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlayListApi,
    onError: () => {
      Toast.error("Update Playlist Failed.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      Toast.success("Update Playlist Success.");
    },
  });
};

export const useConnectAccount = () => {
  return useMutation({
    mutationFn: connectBankAccountApi,
  });
};