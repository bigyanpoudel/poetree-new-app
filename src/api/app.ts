import { API } from "@/src/lib/axios";
import { IAppUser, Obj } from "@/src/types";

export const getCurrentUser = async (id: string): Promise<IAppUser> => {
  console.log("id", id);
  return API.get(`/user/${id}`);
};

export const poemLikeApi = ({
  id,
  body,
}: {
  id: string;
  body: {
    type?: string;
  };
}) => {
  return API.patch(`likes/${id}`, body);
};

export const followUserApi = (body: { targetId: string }) => {
  return API.patch("user/follow", body);
};

export const unfollowUserApi = (body: { targetId: string }) => {
  return API.patch("user/unfollow", body);
};

export const deletePoem = (id?: string) => {
  return API.delete("/posts/" + id);
};

export const reportApi = (body: Obj) => {
  return API.post("reports", body);
};
