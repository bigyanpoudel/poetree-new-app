import { API } from "@/src/lib/axios";
import { Obj } from "@/src/types";
import { IPaymentAccountRes } from "../types/accountSetting";

export const changePasswordApi = (body: Obj) => {
  return API.patch("user/change-password", body);
};

export const getUserPaymentAccountDetailsApi =
  (): Promise<IPaymentAccountRes> => {
    return API.get("user/payment-account-details");
  };

export const updateUserProfileApi = (body: any) => {
  return API.patch("/user/update-profile", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
