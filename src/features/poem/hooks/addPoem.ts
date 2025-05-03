import { useMutation } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { createPoemApi, updatePoemApi } from "../api/addPoem";


export const useCreatePoem = () => {
  return useMutation({
    mutationFn: createPoemApi,
    onSuccess: () => {
      Toast.success("Add poem successfull.");
    },
    onError: () => {
        Toast.error("Add poem failed.");
    },
  });
};

export const useUpdatePoem = () => {
  return useMutation({
    mutationFn: updatePoemApi,
    onSuccess: () => {
        Toast.success("Update poem successfull.");
    },
    onError: () => {
        Toast.error("Update poem failed.");
    },
  });
};
