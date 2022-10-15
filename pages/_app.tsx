import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import MainLayout from "../components/Layout/MainLayout";
import { AppProps } from "../node_modules/next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
