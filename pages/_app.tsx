import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { AppProps } from "../node_modules/next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";

import PanelLayout from "@/components/Layout/PanelLayout";
import MainLayout from "@/components/Layout/MainLayout";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const { pathname } = useRouter();

  let getLayout = (page: ReactElement) => {
    if (pathname.includes("/panel")) {
      return <PanelLayout>{page}</PanelLayout>;
    }
    if (pathname.includes("/login") || pathname.includes("/404")) {
      return <>{page}</>;
    }
    return <MainLayout>{page}</MainLayout>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <AuthGuard>
          {getLayout(<Component {...pageProps} />)}
          <NextNProgress options={{ showSpinner: false }} height={3} color="#00c0e9" />
        </AuthGuard>

        <ToastContainer />
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
