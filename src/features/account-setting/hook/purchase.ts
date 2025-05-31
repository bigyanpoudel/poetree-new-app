import { useQuery } from "@tanstack/react-query";
import { query } from "../constant/query";
import { getMyPurchaseListApi } from "../api/purchase";


export const useGetMyPurchaseList = ({
  pageParam,
  limit,
  search,
}: {
  pageParam: number;
  limit: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: [query.getMyPurchase, pageParam, limit, search],
    queryFn: () => getMyPurchaseListApi({ page: pageParam, limit, search }),
  });
};
