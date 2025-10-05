import { API } from "@/src/lib/axios";
import { IAppUser, Obj } from "@/src/types";
import { generateUrlWithParams } from "@/src/utils/params";
import { IAllPoemRes } from "../../home/types/home";
import { IUserFollowinListRes, IUserPlayListRes } from "../types/users";

export const getUserProfileApi = async (id: string): Promise<IAppUser> => {
  return API.get(`/user/${id}`);
};

export const getUsersPoemApi = async ({
  pageParam = 0,
  limit,
  userId,
}: {
  limit: number;
  pageParam: number;
  userId: string;
}): Promise<IAllPoemRes> => {
  const data: any = await API.get(
    `/posts/user/${userId}?limit=${limit}&page=${pageParam}`
  );
  return {
    ...data,
    hasMore: data?.currentPage < data?.totalPage,
  };
};


export const getUserFollowingListApi = ({
  pageParam = 0,
  limit,
  userId,
}: {
  limit: number;
  pageParam: number;
  userId: string;
}): Promise<IUserFollowinListRes> => {
  return API.get(
    `user/following-list/${userId}?limit=${limit}&page=${pageParam}`
  );
};

export const getUserFollowerListApi = ({
  pageParam = 0,
  limit,
  userId,
}: {
  limit: number;
  pageParam: number;
  userId: string;
}): Promise<IUserFollowinListRes> => {
  return API.get(
    `user/follower-list/${userId}?limit=${limit}&page=${pageParam}`
  );
};

export const getUserPlayListApi = async ({
  limit,
  page,
  params,
}: {
  page: number;
  limit: number;
  params: Obj;
}): Promise<IUserPlayListRes> => {
  const url = generateUrlWithParams("playlist/all", {
    limit,
    page,
    ...params,
  });
  console.log("userl", url, params);
  return await API.get(url);
};