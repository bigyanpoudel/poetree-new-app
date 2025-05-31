import { IAppPlayList, IAppPoem, ICommonListApi } from "@/src/types";

export interface IPoemSelectOptionRes extends ICommonListApi<IAppPoem> {}

export interface IPlaylistApiRes extends ICommonListApi<IAppPlayList> {}
