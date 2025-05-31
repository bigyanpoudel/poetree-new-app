import { Obj } from "@/src/types";
import { generateUrlWithParams } from "@/src/utils/params";
import { IPlaylistApiRes } from "../../home/types/home";
import { API } from "@/src/lib/axios";


export const getPlayListApi = (params: Obj): Promise<IPlaylistApiRes> => {
  const url = generateUrlWithParams("playlist/all", params);
  return API.get(url);
};
