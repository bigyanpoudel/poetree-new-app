import { API } from "@/src/lib/axios";
import { IAllPoemRes, IPlaylistApiRes } from "../../home/types/home";
import { IUserListRes } from "../../user/types/users";
import { Obj } from "@/src/types";
import { generateUrlWithParams } from "@/src/utils/params";

export const searchPoemApi = async ({
    pageParam = 0,
    limit,
    search,
  }: {
    limit: number;
    pageParam: number;
    search?: string;
  }): Promise<IAllPoemRes> => {
    const data: any = await API.get(
      `/posts/search?limit=${limit}&page=${pageParam}&search=${encodeURIComponent(
        search ?? ""
      )}`
    );
    return data;
  };
  
  export const searchUserApi = async ({
    pageParam = 0,
    limit,
    search,
  }: {
    limit: number;
    pageParam: number;
    search?: string;
  }): Promise<IUserListRes> => {
    const data: any = await API.get(
      `/user/search?limit=${limit}&page=${pageParam}&search=${encodeURIComponent(
        search ?? ""
      )}`
    );
    return data;
  };
  
  export const getHomePlayListApi = (params: Obj): Promise<IPlaylistApiRes> => {
    const url = generateUrlWithParams("playlist/all", params);
    return API.get(url);
  };
