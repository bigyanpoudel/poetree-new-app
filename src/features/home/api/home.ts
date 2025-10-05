import { API } from "@/src/lib/axios";
import { IAllPoemRes, IHastagsRes } from "../types/home";
import { generateUrlWithParams } from "@/src/utils/params";
import { Obj } from "@/src/types";

export const getAllPoemApi = async ({
  pageParam = 0,
  limit,
}: {
  limit: number;
  pageParam: number;
}): Promise<IAllPoemRes> => {
  const data: any = await API.get(`/posts?limit=${limit}&page=${pageParam}`);
  return {
    ...data,
    hasMore: data?.currentPage < data?.totalPage,
  };
};

export const getAllFeedPoemApi = async ({
  pageParam = 0,
  limit,
}: {
  limit: number;
  pageParam: number;
}): Promise<IAllPoemRes> => {
  const data: any = await API.get(
    `/posts/feeds?limit=${limit}&page=${pageParam}`
  );
  return {
    ...data,
    hasMore: data?.currentPage < data?.totalPage,
  };
};


export const getTrendingPoemApi = async ({
  pageParam = 0,
  limit,
}: {
  limit: number;
  pageParam: number;
}): Promise<IAllPoemRes> => {
  const data: any = await API.get(
    `/posts/trending?limit=${limit}&page=${pageParam}`
  );
  return {
    ...data,
    hasMore: data?.currentPage < data?.totalPage,
  };
};

