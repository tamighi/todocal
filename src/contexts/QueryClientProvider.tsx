import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as RNQueryClientProvider,
} from "@tanstack/react-query";

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryCache = new QueryCache({
    onError: (e) => {
      console.log(e);
    },
  });

  const mutationCache = new MutationCache({
    onError: (e) => {
      console.log(e);
    },
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
