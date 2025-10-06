import { API } from "@/src/lib/axios";
import {
  ICreateSubscriptionResponse,
  IPaymentHistoryResponse,
  IProduct,
  ISubscriptionResponse,
} from "../types";

export const getProductsApi = async (): Promise<IProduct[]> => {
  return await API.get("/payment/products");
};

export const createSubscriptionApi = async (data: {
  productId: string;
  priceId: string;
  interval: string;
  plan: string;
  paymentMethodId?: string;
}): Promise<ICreateSubscriptionResponse> => {
  return await API.post("/payment/subscription/checkout", data);
};

export const getCurrentSubscriptionApi =
  async (): Promise<ISubscriptionResponse> => {
    return await API.get("/payment/my-subscriptions");
  };

export const pauseSubscriptionApi = async (data: {
  subscriptionId: string;
  reason?: string;
}): Promise<any> => {
  return await API.post("/payment/subscription/pause", data);
};

export const resumeSubscriptionApi = async (data: {
  subscriptionId: string;
  reason?: string;
}): Promise<any> => {
  return await API.post("/payment/subscription/resume", data);
};

export const cancelSubscriptionApi = async (data: {
  subscriptionId: string;
  reason?: string;
}): Promise<any> => {
  return await API.post("/payment/subscription/cancel", data);
};

export const getSubscriptionApi = async (
  subscriptionId: string
): Promise<ISubscriptionResponse> => {
  return await API.get(`/payment/subscription/${subscriptionId}`);
};

export const listCustomerSubscriptionsApi = async (params?: {
  page?: number;
  limit?: number;
}): Promise<IPaymentHistoryResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const url = `/payment/my-payment-history${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return await API.get(url);
};

export const reactivateSubscriptionApi = async (
  subscriptionId: string
): Promise<ISubscriptionResponse> => {
  return await API.post(`/payment/subscriptions/${subscriptionId}/reactivate`);
};

export const resubscribeApi = async (data: {
  plan: string;
  priceId: string;
  interval: string;
  successUrl?: string;
  cancelUrl?: string;
}): Promise<{ url: string }> => {
  return await API.post("/payment/subscription/resubscribe", data);
};
