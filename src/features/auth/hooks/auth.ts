import { useMutation } from "@tanstack/react-query";
import {
  forgetPasswordApi,
  resentVerificationLinkApi,
  signinApi,
  SignupApi,
} from "../api/auth";

import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { POETREE_USER } from "@/src/utils/constant/appConstant";
import { storageUtil } from "@/src/utils/storage";
import { useAppProvider } from "@/src/provider/appProvider";

export const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: SignupApi,
    onSuccess: () => {
      Toast.success(
        "Create Account Success. Please verify your account before login."
      );
      router.navigate("/signin");
    },
  });
};
export const useSignin = () => {
  const router = useRouter();
  const { setUser } = useAppProvider();
  return useMutation({
    mutationFn: signinApi,
    onSuccess: async (data: any) => {
      await storageUtil.setItem(POETREE_USER, JSON.stringify(data));
      setUser(data);
      console.log("data", data);
      router.navigate("/");
    },
  });
};

export const useSentVerificationLink = () => {
  return useMutation({
    mutationFn: resentVerificationLinkApi,
    onSuccess: () => {
      Toast.success(
        "Account verification link sent success. Please check your email."
      );
    },
    onError: () => {
      Toast.error("Account verification link sent failed.");
    },
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPasswordApi,
    onError: () => {
      Toast.error("Forget Password Failed. Please try again.");
    },
    onSuccess: () => {
      Toast.success(
        "A password reset email has been sent successfully. Please check your inbox."
      );
    },
  });
};
