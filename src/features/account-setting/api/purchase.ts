import { API } from "@/src/lib/axios";
import { Obj } from "@/src/types";
import { generateUrlWithParams } from "@/src/utils/params";
import { IPurchaseApiRes } from "../types/accountSetting";

export const getMyPurchaseListApi = (params: Obj): Promise<IPurchaseApiRes> => {
  const url = generateUrlWithParams("purchase/my-purchase", params);
  return API.get(url);
};
