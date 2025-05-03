import { IAppPlayList, IAppUser, ICommonListApi } from "@/src/types";

export interface IUserListRes extends ICommonListApi<IAppUser> {}

export interface IUserFollowinListRes extends ICommonListApi<IAppUser> {}
export interface IUserPlayListRes extends ICommonListApi<IAppPlayList> {}
