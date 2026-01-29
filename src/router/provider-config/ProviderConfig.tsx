import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "../../redux";
import Modals from "../../components/modals";

const ProviderConfig = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Modals />
          <Toaster />
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default ProviderConfig;
