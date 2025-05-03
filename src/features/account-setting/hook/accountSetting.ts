import { appQuery } from "@/src/utils/constant/appQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { userQuery } from "../../user/constant/query";
import { updateUserProfileApi } from "../api/accountSetting";
import { useRouter } from "expo-router";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
    return useMutation({
      mutationFn: updateUserProfileApi,
      onError: () => {
        Toast.error("Update Profile Failed.");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [userQuery.getUserProfile],
        });
        queryClient.invalidateQueries({
          queryKey: [appQuery.getCurrentUser],
        });
        Toast.success("Update Profile Success.");
        router.back();
      },
    });
  };

