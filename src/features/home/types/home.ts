import { IAppPoem, ICommonListApi, IPoemHasTag } from "@/types";

export interface IAllPoemRes extends ICommonListApi<IAppPoem> {
  hasMore: boolean;
}
interface IHashTags {
  count: 7;
  hashtag: IPoemHasTag;
}
export interface IHastagsRes extends ICommonListApi<IHashTags> {}
