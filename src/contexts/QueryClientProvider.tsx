import {
  QueryClient,
  QueryClientProvider as RNQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RNQueryClientProvider client={queryClient}>
      {children}
    </RNQueryClientProvider>
  );
};
