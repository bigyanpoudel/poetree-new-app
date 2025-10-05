import { API } from "@/src/lib/axios";
import { IPoemSubmission } from "@/src/types";
import { IUserSubmissionsRes } from "../types";
import { generateUrlWithParams } from "@/src/utils/params";

export const getUserSubmissionsApi = async ({
  pageParam = 1,
  limit,
  status,
}: {
  limit: number;
  pageParam: number;
  status?: string;
}): Promise<IUserSubmissionsRes> => {
  const params = {
    limit,
    page: pageParam,
    ...(status && { status }),
  };
  const url = generateUrlWithParams("anthologies/my/submissions", params);
  const data: any = await API.get(url);
  
  return {
    ...data,
    hasMore: data?.currentPage < data?.totalPages,
  };
};