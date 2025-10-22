import { API } from "@/src/lib/axios";
import { IAppUser, Obj, PostReactionsResponseDto } from "@/src/types";
import { generateUrlWithParams } from "../utils/params";

export const getCurrentUser = async (id: string): Promise<IAppUser> => {
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

export const getPostReactions = ({
  postId,
  page = 1,
  limit = 20,
  type,
}: {
  postId: string;
  page?: number;
  limit?: number;
  type?: string;
}): Promise<PostReactionsResponseDto> => {
  const url = generateUrlWithParams(`/likes/post/${postId}/reactions`, {
    postId,
    page,
    limit,
    type,
  });
  return API.get(url);
};
