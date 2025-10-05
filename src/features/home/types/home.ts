import {
  IAppPlayList,
  IAppPoem,
  ICommonListApi,
  IPoemHasTag,
} from "@/src/types";

export interface IAllPoemRes extends ICommonListApi<IAppPoem> {
  hasMore: boolean;
}
interface IHashTags {
  count: number;
  hashtag: IPoemHasTag;
}
export interface IHastagsRes extends ICommonListApi<IHashTags> {}

export interface IPlaylistApiRes extends ICommonListApi<IAppPlayList> {}
