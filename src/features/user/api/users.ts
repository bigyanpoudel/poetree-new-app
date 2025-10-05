
import { API } from "@/src/lib/axios";
import { IUserListRes } from "../types/users";

export const getUserListApi = async ({
  pageParam = 0,
  limit,
}: {
  limit: number;
  pageParam: number;
}): Promise<IUserListRes> => {
  const data: any = await API.get(
    `/user/users?limit=${limit}&page=${pageParam}`
  );
  return data;
};

export const getUserSiteMapListApi = async ({
  limit,
}: {
  limit: number;
}): Promise<IUserListRes> => {
  const data: any = await API.get(`/user?limit=${limit}`);
  return data;
};

