import { AxiosError } from "axios";
import { Toast } from "toastify-react-native";
import { SOMETHING_WENT_WRONG } from "../constant/appConstant";

export const handleError = (error: AxiosError<any, any>) => {
  console.log("error inside 123", error);
  if (typeof error?.response?.data === "string") {
    return Toast.error(error?.response?.data ?? SOMETHING_WENT_WRONG);
  }
console.log("error inside", error);
  const message =
    error?.response?.data?.message ??
    error?.response?.data?.error?.message ??
    error?.response?.data?.error ??
    SOMETHING_WENT_WRONG;
  return Toast.error(message);
};
