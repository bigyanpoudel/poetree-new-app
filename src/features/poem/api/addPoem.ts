import { API } from "@/src/lib/axios";

export const createPoemApi = (body: any) => {
  return API.post("/posts", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const updatePoemApi = ({ id, body }: { id: string; body: any }) => {
  return API.patch(`/posts/${id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};