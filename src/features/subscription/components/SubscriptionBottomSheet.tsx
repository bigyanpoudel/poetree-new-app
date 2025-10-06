import React, { useState, useEffect, forwardRef } from "react";
import { View, Pressable, ActivityIndicator } from "react-native";
import { Check, Crown } from "lucide-react-native";
import { Text } from "@/src/components/text";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { Button } from "react-native-paper";
import { useGetProducts, useCreateSubscription } from "../hooks/subscription";
import { IProduct, IStripePrice } from "../types";
import { CustomDrawer } from "@/src/components/drawer";

interface ProductCardProps {
  product: IProduct;
  price: IStripePrice;
  onSelect: () => void;
  isSelected: boolean;
  isPopular?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  price,
  onSelect,
  isSelected,
  isPopular = false,
}) => {
  const isDark = useIsDarkTheme();

  const formatPrice = (amount: number, currency: string) => {
    const formatted = (amount / 100).toFixed(2);
    const currencySymbol =
      currency.toUpperCase() === "USD"
        ? "$"
        : currency.toUpperCase() === "CAD"
          ? "C$"
          : currency.toUpperCase();
    return `${currencySymbol}${formatted}`;
  };

  return (
    <Pressable onPress={onSelect}>
      <View
        className="relative p-4 rounded-xl mb-3"
        style={{
          backgroundColor: isSelected
            ? isDark
              ? "#8b5cf6"
              : "#e9d5ff"
            : isDark
              ? Colors.dark.background
              : "#f5f5f5",
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? "#8b5cf6" : isDark ? "#333" : "#e0e0e0",
        }}
      >
        {isPopular && (
          <View
            className="absolute -top-2 -right-2 px-2 py-1 rounded-full"
            style={{ backgroundColor: "#8b5cf6" }}
          >
            <Text
              className="text-xs"
              style={{ color: "#fff" }}
              fontWeight={700}
            >
              Popular
            </Text>
          </View>
        )}

        <View className="flex flex-row items-center justify-between">
          <View className="flex-1">
            <Text
              className="text-base capitalize mb-1"
              style={{ color: isSelected && !isDark ? "#000" : undefined }}
              fontWeight={700}
            >
              {product.name}
            </Text>
            <View className="flex flex-row items-baseline">
              <Text
                className="text-2xl"
                style={{
                  color: isSelected
                    ? isDark
                      ? "#fff"
                      : "#8b5cf6"
                    : "#8b5cf6",
                }}
                fontWeight={800}
              >
                {formatPrice(price.unit_amount, price.currency)}
              </Text>
              <Text
                className="text-sm ml-1"
                style={{
                  color: isSelected && !isDark ? "#000" : undefined,
                  opacity: 0.7,
                }}
              >
                /{price.recurring.interval}
              </Text>
            </View>
          </View>
          {isSelected && (
            <View
              className="rounded-full p-1"
              style={{
                backgroundColor: isDark ? "#fff" : "#8b5cf6",
                width: 28,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check color={isDark ? "#8b5cf6" : "#fff"} size={16} />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

interface SubscriptionBottomSheetProps {
  index: number;
  handleClose: () => void;
  title?: string;
  description?: string;
  feature?: string;
}

export const SubscriptionBottomSheet = forwardRef<
  any,
  SubscriptionBottomSheetProps
>(({ index, handleClose, title, description, feature }, ref) => {
  const isDark = useIsDarkTheme();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<IStripePrice | null>(null);

  const { data: products, isLoading, error } = useGetProducts();
  const createSubscription = useCreateSubscription();

  useEffect(() => {
    if (products && products.length > 0 && !selectedProduct) {
      // Auto-select Standard plan or first product
      const standardProduct =
        products.find((p) => p.name.toLowerCase().includes("standard")) ||
        products[0];
      const defaultPrice =
        standardProduct.prices.find(
          (p) => p.id === standardProduct.default_price
        ) || standardProduct.prices[0];
      setSelectedProduct(standardProduct);
      setSelectedPrice(defaultPrice);
    }
  }, [products, selectedProduct]);

  const handleProductSelect = (product: IProduct) => {
    const defaultPrice =
      product.prices.find((p) => p.id === product.default_price) ||
      product.prices[0];
    setSelectedProduct(product);
    setSelectedPrice(defaultPrice);
  };

  const handleSubscribe = async () => {
    if (!selectedProduct || !selectedPrice) return;

    const isBasicPlan = selectedProduct.name.toLowerCase().includes("basic");
    const isStandardPlan = selectedProduct.name
      .toLowerCase()
      .includes("standard");

    try {
      await createSubscription.mutateAsync({
        productId: selectedProduct.id,
        priceId: selectedPrice.id,
        interval: "month",
        plan: isBasicPlan ? "BASIC" : isStandardPlan ? "STANDARD" : "PREMIUM",
      });
      handleClose();
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  const content = (
   <View className="h-[80vh] flex flex-col gap-5">
      {/* Header */}
      <View className="mb-5">
        <Text className="text-xl mb-2 text-center" fontWeight={800}>
          {title || "Upgrade to Premium"}
        </Text>
        <Text className="text-center opacity-70 text-sm">
          {description ||
            `Choose a plan to access ${feature || "premium features"}`}
        </Text>
      </View>

      {/* Product Plans */}
      <View className="mb-4">
        {isLoading ? (
          <View className="flex justify-center items-center py-6">
            <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
            <Text className="mt-2 text-sm opacity-70">Loading plans...</Text>
          </View>
        ) : error ? (
          <View className="p-4 rounded-lg bg-red-100 mb-4">
            <Text style={{ color: "#dc2626" }} fontWeight={600}>
              Failed to load plans
            </Text>
          </View>
        ) : products && products.length > 0 ? (
          <View>
            {products.map((product) => {
              const defaultPrice =
                product.prices.find((p) => p.id === product.default_price) ||
                product.prices[0];
              const isPopular = product.name.toLowerCase().includes("standard");

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  price={defaultPrice}
                  onSelect={() => handleProductSelect(product)}
                  isSelected={selectedProduct?.id === product.id}
                  isPopular={isPopular}
                />
              );
            })}
          </View>
        ) : (
          <View className="py-6 text-center">
            <Text className="text-sm opacity-70">No plans available</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex flex-row gap-3 mt-4">
        <Button
          mode="outlined"
          onPress={handleClose}
          disabled={createSubscription.isPending}
          style={{
            flex: 1,
            borderColor: isDark ? "#333" : "#e0e0e0",
          }}
          labelStyle={{
            color: isDark ? "#fff" : "#000",
          }}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleSubscribe}
          loading={createSubscription.isPending}
          disabled={!selectedProduct || isLoading || !products || products?.length === 0}
          icon={() => <Crown color="#fff" size={16} />}
          style={{
            flex: 1,
            backgroundColor: "#8b5cf6",
          }}
          labelStyle={{
            color: "#fff",
          }}
        >
          Subscribe
        </Button>
      </View>
    </View>
  );

  return (
    <CustomDrawer
      ref={ref}
      index={index}
      handleClose={handleClose}
      content={content}
      title=""
    />
  );
});

SubscriptionBottomSheet.displayName = "SubscriptionBottomSheet";
