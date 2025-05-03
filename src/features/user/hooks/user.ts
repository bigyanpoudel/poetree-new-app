import { useQuery } from "@tanstack/react-query";
import { userQuery } from "../constant/query";
import { getCurrentUser } from "@/src/api/app";
import { useLocalSearchParams, useRouter } from "expo-router";

export const useGetUserProfile = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  return useQuery({
    queryKey: [userQuery.getUserProfile],
    queryFn: () => getCurrentUser(id),
    enabled: Boolean(id),
  });
};
