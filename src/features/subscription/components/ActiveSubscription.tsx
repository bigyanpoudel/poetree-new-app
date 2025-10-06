import { ScreenLayout } from "@/src/components/layout";
import { CustomDailog } from "@/src/components/modal/dailog";
import { Text } from "@/src/components/text";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Linking from "expo-linking";
import {
  Calendar,
  Check,
  CreditCard,
  DollarSign,
  Download,
  Pause,
  Play,
  X,
} from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import { Pressable, RefreshControl, View } from "react-native";
import { Button } from "react-native-paper";
import { getPlanFeatures } from "../constants/plans";
import {
  useCancelSubscription,
  useGetCurrentSubscription,
  useListCustomerSubscriptions,
  usePauseSubscription,
  useResumeSubscription,
} from "../hooks/subscription";
import { SubscriptionBottomSheet } from "./SubscriptionBottomSheet";

interface SubscriptionCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  gradientColors: string[];
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradientColors,
}) => {
  const isDark = useIsDarkTheme();

  return (
    <View
      className="p-5 rounded-xl"
      style={{
        backgroundColor: isDark ? Colors.dark.background : "#f5f5f5",
        borderWidth: 1,
        borderColor: isDark ? "#333" : "#e0e0e0",
      }}
    >
      <View className="flex flex-col gap-2">
        <View
          className="p-2 rounded-lg self-start"
          style={{ backgroundColor: gradientColors[0] }}
        >
          {icon}
        </View>
        <Text className="text-xs opacity-70" fontWeight={500}>
          {title}
        </Text>
        <Text className="text-2xl" fontWeight={800}>
          {value}
        </Text>
        {subtitle && <Text className="text-sm opacity-60">{subtitle}</Text>}
      </View>
    </View>
  );
};

interface StatusBadgeProps {
  status: string;
  isPaused?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isPaused }) => {
  const getStatusColor = () => {
    if (isPaused) return { bg: "#fbbf24", text: "#ffffff" };
    if (status === "active") return { bg: "#10b981", text: "#ffffff" };
    return { bg: "#ef4444", text: "#ffffff" };
  };

  const colors = getStatusColor();
  const displayStatus = isPaused
    ? "Paused"
    : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <View
      className="px-3 py-1 rounded-full"
      style={{ backgroundColor: colors.bg }}
    >
      <Text className="text-xs" style={{ color: colors.text }} fontWeight={700}>
        {displayStatus}
      </Text>
    </View>
  );
};

interface ActiveSubscriptionProps {
 
}

export const ActiveSubscription: React.FC<ActiveSubscriptionProps> = ({

}) => {
  const isDark = useIsDarkTheme();
  const {data:subscriptionResponse,refetch,isRefetching} = useGetCurrentSubscription()
  const subscription = subscriptionResponse?.data;
  const { data: paymentHistoryResponse, isRefetching: isRefetchingPayments, refetch: refetchList } = useListCustomerSubscriptions();
  const pauseSubscription = usePauseSubscription();
  const resumeSubscription = useResumeSubscription();
  const cancelSubscription = useCancelSubscription();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showResubscribeModal, setShowResubscribeModal] = useState(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const billingHistory = useMemo(() => {
    if (!paymentHistoryResponse?.payments) {
      return [];
    }

    return paymentHistoryResponse.payments.map((payment) => {
      const planDescription = payment.lines?.[0]?.description || "";
      const planMatch = planDescription.match(/×\s+(.+?)\s+\(/);
      const planName = planMatch ? planMatch[1] : "Unknown Plan";

      return {
        id: payment.id,
        date: new Date(payment.created).toLocaleDateString(),
        amount: `$${payment.amount}`,
        status: payment.paid ? "Paid" : payment.status,
        invoice: payment.invoiceNumber,
        invoiceUrl: payment.invoicePdf,
        plan: planName,
        currency: payment.currency.toUpperCase(),
        periodStart: new Date(payment.periodStart).toLocaleDateString(),
        periodEnd: new Date(payment.periodEnd).toLocaleDateString(),
      };
    });
  }, [paymentHistoryResponse]);

  const subscriptionData = useMemo(() => {
    if (!subscription) {
      return {
        plan: "",
        status: "",
        startDate: "",
        nextBillingDate: "",
        amount: "$0.00",
        interval: "monthly",
        subscriptionId: "",
        paymentMethod: null,
        cancelAtPeriodEnd: false,
        hasStripeDetails: false,
      };
    }

    const amount = `$${subscription.amount?.toFixed(2)}`;
    const interval = "monthly";

    return {
      plan:
        subscription.plan?.charAt(0).toUpperCase() + subscription.plan.slice(1),
      status: subscription.stripeDetails?.status || subscription.paymentStatus,
      startDate: new Date(subscription.startDate).toLocaleDateString(),
      nextBillingDate: subscription.nextBillingDate
        ? new Date(subscription.nextBillingDate).toLocaleDateString()
        : "-",
      amount,
      interval,
      subscriptionId: subscription.stripeSubscriptionId,
      paymentMethod: subscription.stripeDetails?.paymentMethod || null,
      cancelAtPeriodEnd: subscription.stripeDetails?.cancelAtPeriodEnd || false,
      hasStripeDetails: subscription.stripeDetails !== null,
    };
  }, [subscription]);

  const isPaused = subscription?.isPaused === true;
  const isActive = subscriptionData.status === "active" && !isPaused;
  const isCancelled =
    subscriptionData.status === "canceled" ||
    subscriptionData.status === "cancelled";

  const planFeatures = useMemo(() => {
    return subscription ? getPlanFeatures(subscription.plan) : [];
  }, [subscription]);

  const handlePause = () => {
    setShowPauseModal(true);
  };

  const handleConfirmPause = () => {
    if (subscriptionData.subscriptionId) {
      pauseSubscription.mutate(
        { subscriptionId: subscriptionData.subscriptionId },
        {
          onSuccess: () => {
            setShowPauseModal(false);
          },
        }
      );
    }
  };

  const handleResume = () => {
    setShowResumeModal(true);
  };

  const handleConfirmResume = () => {
    if (subscriptionData.subscriptionId) {
      resumeSubscription.mutate(
        { subscriptionId: subscriptionData.subscriptionId },
        {
          onSuccess: () => {
            setShowResumeModal(false);
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (subscriptionData.subscriptionId) {
      cancelSubscription.mutate(
        { subscriptionId: subscriptionData.subscriptionId },
        {
          onSuccess: () => {
            setShowCancelModal(false);
          },
        }
      );
    }
  };

  const handleReactivate = () => {
    setShowResubscribeModal(true);
    bottomSheetRef.current?.expand();
  };

  const handleCloseBottomSheet = () => {
    setShowResubscribeModal(false);
    bottomSheetRef.current?.close();
  };

  const handleDownloadInvoice = async (url: string) => {
    if (url) {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    }
  };
  const refetchFn = async () => {
    await refetch()
    await refetchList()
  }
  return (
    <ScreenLayout
      appBar={{
        title: "Subscription",
      }}
      scafold={{
        refreshControl: (
          <RefreshControl
            refreshing={isRefetching || isRefetchingPayments}
            onRefresh={refetchFn}
          />
        ),
      }}
    >

      <View className="flex flex-col gap-5">
        {/* Current Plan Overview */}
        <View className="flex flex-row items-center justify-between mb-2">
          <Text className="text-xl" fontWeight={800}>
            {subscriptionData.plan}
          </Text>
          <StatusBadge status={subscriptionData.status} isPaused={isPaused} />
        </View>

        {/* Subscription Cards */}
        <View className="flex flex-col gap-4">
          <SubscriptionCard
            title="Billing Amount"
            value={subscriptionData.amount}
            subtitle={`per ${subscriptionData.interval}`}
            icon={<DollarSign color="#fff" size={20} />}
            gradientColors={["#8b5cf6"]}
          />

          <SubscriptionCard
            title="Next Billing Date"
            value={subscriptionData.nextBillingDate}
            icon={<Calendar color="#fff" size={20} />}
            gradientColors={["#10b981"]}
          />

          <SubscriptionCard
            title="Start Date"
            value={subscriptionData.startDate}
            icon={<Calendar color="#fff" size={20} />}
            gradientColors={["#3b82f6"]}
          />
        </View>

        {/* Payment Method Section */}
        {subscriptionData.paymentMethod && (
          <View
            className="p-5 rounded-xl"
            style={{
              backgroundColor: isDark ? Colors.dark.background : "#f5f5f5",
              borderWidth: 1,
              borderColor: isDark ? "#333" : "#e0e0e0",
            }}
          >
            <Text className="text-lg mb-4" fontWeight={700}>
              Payment Method
            </Text>
            <View className="flex flex-row items-center gap-4">
              <View
                className="p-3 rounded-lg"
                style={{ backgroundColor: "#3b82f6" }}
              >
                <CreditCard color="#fff" size={24} />
              </View>
              <View className="flex-1">
                <Text fontWeight={500}>
                  {subscriptionData.paymentMethod.card.brand.toUpperCase()}{" "}
                  **** {subscriptionData.paymentMethod.card.last4}
                </Text>
                <Text className="text-xs opacity-60 mt-1">
                  Expires {subscriptionData.paymentMethod.card.exp_month}/
                  {subscriptionData.paymentMethod.card.exp_year}
                </Text>
              </View>
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: "#10b981" }}
              >
                <Text
                  className="text-xs capitalize"
                  style={{ color: "#fff" }}
                  fontWeight={500}
                >
                  {subscriptionData.paymentMethod.card.funding}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Incomplete Payment Notice */}
        {!subscriptionData.hasStripeDetails && (
          <View
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#fef3c7",
              borderWidth: 1,
              borderColor: "#fbbf24",
            }}
          >
            <Text
              className="text-lg mb-2"
              fontWeight={700}
              style={{ color: "#92400e" }}
            >
              Payment Pending
            </Text>
            <Text className="mb-4" style={{ color: "#78350f" }}>
              Your subscription has been created but payment is incomplete.
              Please complete the payment to activate your subscription.
            </Text>
            <Button
              mode="contained"
              onPress={handleReactivate}
              style={{ backgroundColor: "#3b82f6" }}
              labelStyle={{ color: "#fff" }}
            >
              Complete Payment
            </Button>
          </View>
        )}

        {/* Plan Features */}
        {planFeatures.length > 0 && (
          <View
            className="p-5 rounded-xl"
            style={{
              backgroundColor: isDark ? Colors.dark.background : "#f5f5f5",
              borderWidth: 1,
              borderColor: isDark ? "#333" : "#e0e0e0",
            }}
          >
            <Text className="text-lg mb-4" fontWeight={700}>
              {subscriptionData.plan} Features
            </Text>
            <View className="flex flex-col gap-3">
              {planFeatures.map((feature) => (
                <View key={feature.id} className="flex flex-row gap-3">
                  <View
                    className="p-2 rounded-full self-start"
                    style={{ backgroundColor: "#10b981" }}
                  >
                    <Check color="#fff" size={16} />
                  </View>
                  <View className="flex-1">
                    <Text fontWeight={500}>{feature.name}</Text>
                    {feature.description && (
                      <Text className="text-xs opacity-60 mt-0.5">
                        {feature.description}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Subscription Actions */}
        {subscriptionData.hasStripeDetails && (
          <View
            className="p-5 rounded-xl"
            style={{
              backgroundColor: isDark ? Colors.dark.background : "#f5f5f5",
              borderWidth: 1,
              borderColor: isDark ? "#333" : "#e0e0e0",
            }}
          >
            <Text className="text-lg mb-2" fontWeight={700}>
              Manage Subscription
            </Text>
            <Text className="text-sm opacity-60 mb-4">
              Control your subscription settings and preferences
            </Text>

            <View className="flex flex-col gap-3">
              {isActive && (
                <>
                  <Button
                    mode="outlined"
                    onPress={handlePause}
                    loading={pauseSubscription.isPending}
                    icon={() => (
                      <Pause color={isDark ? "#fff" : "#000"} size={16} />
                    )}
                    style={{
                      borderColor: isDark ? "#333" : "#e0e0e0",
                    }}
                    labelStyle={{
                      color: isDark ? "#fff" : "#000",
                    }}
                  >
                    Pause Subscription
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={handleCancel}
                    loading={cancelSubscription.isPending}
                    icon={() => <X color="#ef4444" size={16} />}
                    style={{
                      borderColor: "#ef4444",
                    }}
                    labelStyle={{
                      color: "#ef4444",
                    }}
                  >
                    Cancel Subscription
                  </Button>
                </>
              )}

              {isPaused && (
                <Button
                  mode="contained"
                  onPress={handleResume}
                  loading={resumeSubscription.isPending}
                  icon={() => <Play color="#fff" size={16} />}
                  style={{
                    backgroundColor: "#10b981",
                  }}
                  labelStyle={{
                    color: "#fff",
                  }}
                >
                  Resume Subscription
                </Button>
              )}

              {isCancelled && (
                <Button
                  mode="contained"
                  onPress={handleReactivate}
                  style={{
                    backgroundColor: "#3b82f6",
                  }}
                  labelStyle={{
                    color: "#fff",
                  }}
                >
                  Resubscribe
                </Button>
              )}
            </View>
          </View>
        )}

        {/* Billing History */}
        {billingHistory.length > 0 && (
          <View
            className="p-5 rounded-xl"
            style={{
              backgroundColor: isDark ? Colors.dark.background : "#f5f5f5",
              borderWidth: 1,
              borderColor: isDark ? "#333" : "#e0e0e0",
            }}
          >
            <Text className="text-lg mb-2" fontWeight={700}>
              Billing History
            </Text>
            <Text className="text-sm opacity-60 mb-4">
              View all your past subscription payments and invoices
            </Text>

            <View className="flex flex-col gap-3">
              {billingHistory.slice(0, 5).map((payment) => (
                <View
                  key={payment.id}
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: isDark ? "#1a1a1a" : "#fff",
                    borderWidth: 1,
                    borderColor: isDark ? "#333" : "#e0e0e0",
                  }}
                >
                  <View className="flex flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                      <Text fontWeight={500}>{payment.plan}</Text>
                      <Text className="text-xs opacity-60">
                        {payment.date}
                      </Text>
                    </View>
                    <View
                      className="px-2 py-1 rounded"
                      style={{
                        backgroundColor:
                          payment.status === "Paid" ? "#10b981" : "#fbbf24",
                      }}
                    >
                      <Text
                        className="text-xs"
                        style={{ color: "#fff" }}
                        fontWeight={500}
                      >
                        {payment.status}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row justify-between items-center">
                    <Text fontWeight={700}>{payment.amount}</Text>
                    {payment.invoiceUrl && (
                      <Pressable
                        onPress={() =>
                          handleDownloadInvoice(payment.invoiceUrl)
                        }
                      >
                        <View className="flex flex-row items-center gap-2">
                          <Download
                            color={isDark ? "#fff" : "#000"}
                            size={16}
                          />
                          <Text className="text-xs" fontWeight={500}>
                            Download
                          </Text>
                        </View>
                      </Pressable>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>


      {/* Modals */}
      <CustomDailog
        visible={showCancelModal}
        title="Cancel Subscription"
        content="Are you sure you want to cancel your subscription? You will continue to have access until the end of your billing period."
        okText="Yes, Cancel"
        isLoading={cancelSubscription.isPending}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
      />

      <CustomDailog
        visible={showPauseModal}
        title="Pause Subscription"
        content="Are you sure you want to pause your subscription? Your subscription will be paused and you won't be charged until you resume it."
        okText="Yes, Pause"
        isLoading={pauseSubscription.isPending}
        onClose={() => setShowPauseModal(false)}
        onConfirm={handleConfirmPause}
      />

      <CustomDailog
        visible={showResumeModal}
        title="Resume Subscription"
        content="Are you sure you want to resume your subscription? Billing will restart and you will be charged according to your plan."
        okText="Yes, Resume"
        isLoading={resumeSubscription.isPending}
        onClose={() => setShowResumeModal(false)}
        onConfirm={handleConfirmResume}
      />

      {/* Subscription Bottom Sheet */}
      {showResubscribeModal && (
        <SubscriptionBottomSheet
          ref={bottomSheetRef}
          index={0}
          handleClose={handleCloseBottomSheet}
          title="Choose Your Plan"
          description="Select a plan to resubscribe and start monetizing your poetry again"
          feature="premium features"
        />
      )}
    </ScreenLayout>
  );
};
