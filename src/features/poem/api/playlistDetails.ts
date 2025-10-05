import { API } from "@/src/lib/axios";
import { IAppPlayList, Obj } from "@/src/types";
import { ICommentRes } from "../types/poemDetail";

export const getPlaylistDetailApi = async (
  id: string
): Promise<IAppPlayList> => {
  return API.get("playlist/" + id);
};

export const playlistLikeApi = ({
  id,
  body,
}: {
  id: string;
  body: {
    type?: string;
  };
}) => {
  return API.patch(`likes/playlist/${id}`, body);
};

export const addCommentApi = ({
  id,
  body,
}: {
  id: string;
  body: {
    text: string;
  };
}) => {
  return API.patch(`/comments/playlist/${id}`, body);
};

export const getAllPostCommentsApi = async ({
  pageParam = 0,
  limit,
  id,
}: {
  limit: number;
  pageParam: number;
  id: string;
}): Promise<ICommentRes> => {
  const data: any = await API.get(
    `/comments/playlist/${id}?limit=${limit}&page=${pageParam}`
  );
  return {
    ...data,
  };
};

export const deleteCommentApi = ({
  postId,
  id,
}: {
  postId: string;
  id: string;
}) => {
  return API.patch(`/comments/playlist/delete/${postId}/${id}`);
};

export const puchasePlaylistApi = (body: Obj) => {
  return API.post("purchase", body);
};