import React, { useState } from "react";
import { View, ActivityIndicator, Image, ImageProps } from "react-native";
import classnames from "classnames";

interface IFastImageProps extends Omit<ImageProps, 'source'> {
  source?: string | { uri: string };
  placeholder?: React.ReactNode;
  showLoader?: boolean;
  className?: string;
}

export const FastImageComponent: React.FC<IFastImageProps> = ({
  source,
  placeholder,
  showLoader = true,
  className,
  resizeMode = "cover",
  style,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageSource = typeof source === 'string' ? { uri: source } : source;

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const defaultPlaceholder = (
    <View 
      className={classnames("bg-gray-200 dark:bg-gray-700 flex items-center justify-center", className)}
    >
      {showLoader && isLoading && (
        <ActivityIndicator size="small" color="#9CA3AF" />
      )}
      {hasError && (
        <View className="bg-gray-300 dark:bg-gray-600 w-8 h-8 rounded flex items-center justify-center">
          <View className="w-4 h-4 bg-gray-500 dark:bg-gray-400 rounded" />
        </View>
      )}
    </View>
  );

  if (!imageSource?.uri) {
    return placeholder || defaultPlaceholder;
  }

  return (
    <View className="relative">
      <Image
        source={imageSource}
        className={className}
      
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      />
      {(isLoading || hasError) && (
        <View 
          className={classnames("absolute inset-0", className)}
        >
          {placeholder || defaultPlaceholder}
        </View>
      )}
    </View>
  );
};