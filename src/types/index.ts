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
  id?: string;
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
  stripeCustomerId?: string;
  isStripeCardAdded?: boolean;
  subscription?: {
    isSubscribed: boolean;
    subscriptionActive: boolean;
    paymentStatus: string;
    plan?: string;
    amount?: string;
    nextBillingDate?: string;
    isPaused?: boolean;
    stripeSubscriptionId?: string;
  };
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
  status?: boolean;
}

export enum PurchaseStatusEnum {
  pending = "PENDING",
  paid = "PAID",
  failed = "FAILED",
}

export type AnthologyPricing = {
  ebookPrice: number;
  printPrice: number;
  royaltyRate: number; // should be between 0 and 1
};

export enum AnthologyStatusEnum {
  DRAFT = "draft",
  Ongoing = "ongoing",
  Completed = "completed",
  PUBLISHED = "published",
  CANCELLED = "cancelled",
}

export type IAppAnthology = {
  _id: string;
  title: string;
  theme: string;
  submissionDeadline: string;
  coverImage?: string;
  pricing?: AnthologyPricing;
  createdAt: string;
  updatedAt: string;
  slug: string;
  status: AnthologyStatusEnum;
  submitted?: boolean;
};

export enum SubmissionStatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export type IPoemSubmission = {
  _id: string;
  submittedAt: string;
  poem: {
    title: string;
    content: string;
  };
  status: SubmissionStatusEnum;
  poet: IAppUser;
  anthology?: IAppAnthology;
  rejectionReason?: string;
};

export interface PostReactionDto {
  _id: string;
  type: string;
  reactedBy: IAppUser;
  createdAt: string;
}

export interface PostReactionsResponseDto {
  reactions: PostReactionDto[];
  totalReactions: number;
  reactionCounts: {
    like: number;
    love: number;
    haha: number;
    sad: number;
    wow: number;
    angry: number;
  };
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

