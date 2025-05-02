import {
  DefaultOptions,
  focusManager,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AppStateStatus, Platform } from "react-native";
import { handleError } from "../utils/handler/error";

export function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
  queryCache: new QueryCache({
    onError: (error) => handleError(error as AxiosError<any, any>),
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      // If the mutation has its own onError, skip
      console.log("error catch", error);
      if (mutation.options.onError) return;

      handleError(error as AxiosError<any, any>);
    },
  }),
});
