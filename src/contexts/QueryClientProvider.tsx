import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as RNQueryClientProvider,
} from "@tanstack/react-query";
import { Alert } from "react-native";

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const onError = (e: Error) => {
    Alert.alert("Database error", e.message);
  };

  const queryCache = new QueryCache({
    onError,
  });

  const mutationCache = new MutationCache({
    onError,
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
    queryCache,
    mutationCache,
  });

  return (
    <RNQueryClientProvider client={queryClient}>
      {children}
    </RNQueryClientProvider>
  );
};
