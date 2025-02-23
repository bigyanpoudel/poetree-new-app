export interface Obj {
  [key: string]: any;
}

export interface IExpoRouteTabItemProp {
  name: string;
}


export interface ICommonTableProps<T> {
  isLoading: boolean;
  data?: T[];
  current?: number;
  pageSize?: number;
  total?: number;
  nextLink?: string;
  totalRecordCountLimitExceeded?: boolean;
  handleView: (detail: T) => void;
  handleUpdate: (detail: T) => void;
  handleDelete: (detailId: string) => void;
  handleChange?: (page: number, pageSize: number) => void;
  handleSearch?: (val: string) => void;
  search?: string;
  handleRowSelectionChange?: (
    selectedRowKeys: React.Key[],
    selectedRows?: object[]
  ) => void;
  handleApplyFilter?: (args: Obj, isReset?: boolean) => void;
  filterData?: Obj;
}

export enum SizeEnum {
  small = "small",
  medium = "medium",
  large = "large",
}

export interface IAppUser {
  createdAt: string;
  email: string;
  expiryDate: string;
  isActive: boolean;
  name: string;
  platformAccess: string;
  role: string;
  updatedAt: string;
  _id: string;
  followings: string[];
  followers: string[];
  photo?: string;
  isFollowing?: boolean;
  followersCount: number;
  followingCount: number;
  slug: string;
  about?: string;
  suspendUntil?: string;
  stripeAccountId?: string;
  isStripeCardAdded?: boolean;
}

export interface ICommonListApi<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  count?: number;
}

export interface IPoemHasTag {
  name: string;
  _id: string;
}
export interface IAppPoem {
  body: string;
  comments: Array<any>;
  createdAt: string;
  hashTags: IPoemHasTag[];
  likes: Array<any>;
  postedBy: IAppUser;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
  audio?: string;
  thumbnail?: string;
  video?: string;
  hasUserLiked: boolean;
  likeCount: number;
  commentCount: number;
  userLike?: {
    type: string;
    _id: string;
  };
  slug: string;
  isFollowedByCurrentUser: boolean;
  visibility?: PostVisibilitTypeEnum;
  viewsCount?: number;
}

export enum POEMTYPE {
  image = 1,
  audio = 2,
  video = 3,
  text = 4,
}

export enum ReactionTypeEnum {
  LIKE = "like",
  LOVE = "love",
  LAUGH = "laugh",
  SAD = "sad",
}

export enum POEMREACTION {
  LIKE = "like",
  LAUGH = "haha",
  LOVE = "love",
  SAD = "sad",
  ANGRY = "angry",
  WOW = "wow",
}

export enum SubscriptionPlanEnum {
  BASIC = "basic",
  STANDARD = "standard",
  PREMIUM = "premium",
}

export enum PostVisibilitTypeEnum {
  free = "free",
  paid = "paid",
}

export enum ConfirmationTypeEnum {
  success = "success",
  warning = "warning",
  danger = "danger",
  primary = "primary",
}

export interface SelectInputOption {
  value: string;
  label: string;
}

export enum SelectModeEnum {
  multiple = "multiple",
  tags = "tags",
}

export enum PlacementEnum {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
}

export enum DrawerSizeEnum {
  small = "sm",
  medium = "md",
  large = "lg",
}

export enum ReportStatusEnum {
  PENDING = "pending",
  RESOLVED = "resolved",
}

export interface IAppPlayList {
  title: string;
  price: number;
  hashTags: IPoemHasTag[];
  likeCount: number;
  commentCount: number;
  slug: string;
  _id: string;
  poems: IAppPoem[];
  createdBy: IAppUser;
  thumbnail?: string;
  createdAt: string;
  userLike?: {
    type: string;
    _id: string;
  };
  isFollowedByCurrentUser?: boolean;
  isLocked?: boolean;
}

export enum PurchaseStatusEnum {
  pending = "PENDING",
  paid = "PAID",
  failed = "FAILED",
}

