import { ICommonListApi } from "@/src/types";

export interface IComment {
  id: string;
  text: string;
  commentedBy: {
    _id: string;
    name: string;
    email: string;
  }[];
  createdAt: string;
}

export interface ICommentRes extends ICommonListApi<IComment> {}
