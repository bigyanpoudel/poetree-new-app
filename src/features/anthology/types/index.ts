import { IAppAnthology, ICommonListApi, IPoemSubmission } from "@/src/types";

// Re-export anthology types from main types file
export type { AnthologyStatusEnum, IAppAnthology } from "@/src/types";

export interface IPublicAnthologiesRes extends ICommonListApi<IAppAnthology>{ }


export interface IUserSubmissionsRes extends ICommonListApi<IPoemSubmission> { }