import { API } from "@/src/lib/axios";
import { IHastagsRes } from "../../home/types/home";
import { IUserListRes } from "../../user/types/users";

export const getPoemHashTagsApi = async ({
  pageParam = 0,
  limit,
}: {
  limit: number;
  pageParam: number;
}): Promise<IHastagsRes> => {
  const data: any = await API.get(
    `/posts/hastag?limit=${limit}&page=${pageParam}`
  );
  return {
    ...data,
    hasMore: data?.currentPage < data?.totalPage,
  };
};

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
