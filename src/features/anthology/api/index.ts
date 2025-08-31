import { API } from "@/src/lib/axios";
import { generateUrlWithParams } from "@/src/utils/params";
import { IAppAnthology, IPublicAnthologiesRes } from "../types";
import { Obj } from "@/src/types";

export const getPublicAnthologiesApi = async ({
    pageParam = 1,
    limit,
    search,
  }: {
    limit: number;
    pageParam: number;
    search?: string;
  }): Promise<IPublicAnthologiesRes> => {
    const params = {
      limit,
      hideDraft:true,
      page: pageParam,
      ...(search && { search }),
    };
    
    const url = generateUrlWithParams("/anthologies", params);
    const data: any = await API.get(url);
    
    return {
      ...data,
      hasMore: data?.currentPage < data?.totalPages,
    };
};
  
export const getAnthologyDetailsApi = async (
    id: string
  ): Promise<IAppAnthology> => {
    const data: any = await API.get(`/anthologies/${id}`);
    return data;
};
  
export const submitPoemApi = async(body:Obj) => {
    return await API.post(`anthologies/${body.id}/submit`,body)
  }
  