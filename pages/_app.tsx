import PanelLayout from "@/components/Layout/PanelLayout";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import MainLayout from "../components/Layout/MainLayout";
import { AppProps } from "../node_modules/next/app";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();
  let getLayout = (page: ReactElement) => {
    if (router.pathname.includes("/panel")) {
      return <PanelLayout>{page}</PanelLayout>;
    }
    if (router.pathname.includes("/login")) {
      return <>{page}</>;
    }
    return <MainLayout>{page}</MainLayout>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default MyApp;
