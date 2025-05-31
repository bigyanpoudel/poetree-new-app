import { Obj } from "@/src/types";
import { IPoemSelectOptionRes } from "../types/playlist";
import { generateUrlWithParams } from "@/src/utils/params";
import { API } from "@/src/lib/axios";


export const getUsersPoemListApi = async (
  params: Obj
): Promise<IPoemSelectOptionRes> => {
  const url = generateUrlWithParams("posts/users-poem-select", params);
  return await API.get(url);
};

export const createPlayListApi = (data: Obj) => {
  return API.post("playlist", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const connectBankAccountApi = () => {
  return API.post("user/connect-account");
};

export const updatePlayListApi = ({ id, data }: { data: Obj; id: string }) => {
  return API.patch(`playlist/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};