import { API } from "@/src/lib/axios";
import { IAppPoem } from "@/src/types";
import { ICommentRes } from "../types/poemDetail";
import { storageUtil } from "@/src/utils/storage";
import { generateUUID } from "@/src/utils/common";

export const getPoemDetail = async (id: string): Promise<IAppPoem> => {
  return API.get("posts/" + id);
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
  return API.patch(`/comments/${id}`, body);
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
    `/comments/${id}?limit=${limit}&page=${pageParam}`
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
  return API.patch(`/comments/delete/${postId}/${id}`);
};

export const updatePoemViewCountApi = async (id: string) => {
  let tempId = await storageUtil.getItem("TEMP_USER_ID");
  if (!tempId) {
    const id = generateUUID();
    await storageUtil.setItem("TEMP_USER_ID", id);
    tempId = id;
  }
  return API.post("posts/update-view-count", {
    postId: id,
    id: tempId,
  });
};
