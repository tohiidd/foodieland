import { PropsWithChildren, useContext, useEffect } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { status } = useSession();
  const { pathname, replace } = useRouter();

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner full />
      </div>
    );
  }

  if (status === "unauthenticated" && pathname.includes("/panel/")) {
    typeof window !== "undefined" && replace("/login");
    return null;
  }
  if (status === "authenticated" && pathname.includes("/login")) {
    typeof window !== "undefined" && replace("/");
    return null;
  }

  return <>{children}</>;
}
