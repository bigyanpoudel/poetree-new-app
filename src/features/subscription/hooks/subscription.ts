import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import * as Linking from "expo-linking";
import {
  cancelSubscriptionApi,
  createSubscriptionApi,
  getCurrentSubscriptionApi,
  getProductsApi,
  getSubscriptionApi,
  listCustomerSubscriptionsApi,
  pauseSubscriptionApi,
  reactivateSubscriptionApi,
  resubscribeApi,
  resumeSubscriptionApi,
} from "../api/subscription";
import { subscriptionQuery } from "../constants/query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [subscriptionQuery.getProducts],
    queryFn: getProductsApi,
  });
};

export const useGetCurrentSubscription = () => {
  return useQuery({
    queryKey: [subscriptionQuery.getCurrentSubscription],
    queryFn: getCurrentSubscriptionApi,
  });
};

export const useGetSubscription = (subscriptionId: string) => {
  return useQuery({
    queryKey: [subscriptionQuery.getSubscription, subscriptionId],
    queryFn: () => getSubscriptionApi(subscriptionId),
    enabled: !!subscriptionId,
  });
};

export const useListCustomerSubscriptions = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [subscriptionQuery.listCustomerSubscriptions, params],
    queryFn: () => listCustomerSubscriptionsApi(params),
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscriptionApi,
    onSuccess: async (response) => {
      if (response.url) {
        // Open the Stripe checkout URL
        const canOpen = await Linking.canOpenURL(response.url);
        if (canOpen) {
          await Linking.openURL(response.url);
        } else {
          Toast.error("Unable to open payment URL");
        }
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to create subscription";
      Toast.error(message);
    },
  });
};

export const usePauseSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { subscriptionId: string; reason?: string }) =>
      pauseSubscriptionApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [subscriptionQuery.getCurrentSubscription],
      });
      Toast.success("Subscription paused successfully!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to pause subscription";
      Toast.error(message);
    },
  });
};

export const useResumeSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { subscriptionId: string; reason?: string }) =>
      resumeSubscriptionApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [subscriptionQuery.getCurrentSubscription],
      });
      Toast.success("Subscription resumed successfully!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to resume subscription";
      Toast.error(message);
    },
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { subscriptionId: string; reason?: string }) =>
      cancelSubscriptionApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [subscriptionQuery.getCurrentSubscription],
      });
      Toast.success("Subscription canceled successfully!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to cancel subscription";
      Toast.error(message);
    },
  });
};

export const useReactivateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: string) =>
      reactivateSubscriptionApi(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [subscriptionQuery.getCurrentSubscription],
      });
      Toast.success("Subscription reactivated successfully!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to reactivate subscription";
      Toast.error(message);
    },
  });
};

export const useResubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      plan: string;
      priceId: string;
      interval: string;
      successUrl?: string;
      cancelUrl?: string;
    }) => resubscribeApi(data),
    onSuccess: async (response) => {
      if (response.url) {
        // Open the Stripe checkout URL
        const canOpen = await Linking.canOpenURL(response.url);
        if (canOpen) {
          await Linking.openURL(response.url);
        } else {
          Toast.error("Unable to open payment URL");
        }
      }
      queryClient.invalidateQueries({
        queryKey: [subscriptionQuery.getCurrentSubscription],
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to resubscribe";
      Toast.error(message);
    },
  });
};
