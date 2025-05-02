import { API } from "@/src/lib/axios";
import { Obj } from "@/src/types";

export const SignupApi =  (body: Obj) => {
  console.log("data", body);
  return  API.post("/user", body);
};

export const resentVerificationLinkApi = (body: { email: string }) => {
  return API.post("/user/send-expiry-token", body);
};

export const forgetPasswordApi = (body: Obj) => {
  return API.post("/user/forgot-password", body);
};

export const signinApi = (body: Obj) => {
  return API.post("/auth/login", body);
};
