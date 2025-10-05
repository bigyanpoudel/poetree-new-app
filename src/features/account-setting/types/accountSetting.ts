import { IAppPlayList, ICommonListApi, PurchaseStatusEnum } from "@/src/types";

export interface IBankAccount {
  id: string;
  object: string;
  account: string;
  account_holder_name: string | null;
  account_holder_type: string | null;
  account_type: string | null;
  available_payout_methods: string[];
  bank_name: string;
  country: string;
  currency: string;
  default_for_currency: boolean;
  fingerprint: string;
  future_requirements: {
    currently_due: string[];
    errors: string[];
    past_due: string[];
    pending_verification: string[];
  };
  last4: string;
  metadata: Record<string, any>;
  requirements: {
    currently_due: string[];
    errors: string[];
    past_due: string[];
    pending_verification: string[];
  };
  routing_number: string;
  status: string;
}

export interface IPaymentAccountRes {
  data: {
    externalAccounts: {
      data: IBankAccount[];
    };
  };
}

interface Playlist {
  _id: string;
  title: string;
  slug: string;
}

export interface IPurchase {
  _id: string;
  status: PurchaseStatusEnum;
  amount: number;
  poems: string[];
  playlistId: IAppPlayList;
  purchasedBy: string;
  createdAt: string;
  updatedAt: string;
  invoiceUrl?: string;
}

export interface IPurchaseApiRes extends ICommonListApi<IPurchase> {}
