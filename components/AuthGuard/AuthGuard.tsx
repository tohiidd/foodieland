import { PropsWithChildren, useContext, useEffect } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/router";
import AuthContext from "contexts/authContext";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { pathname, replace } = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn && pathname.includes("/panel/")) {
    typeof window !== "undefined" && replace("/login");
    return null;
  }
  if (isLoggedIn && pathname.includes("/login")) {
    typeof window !== "undefined" && replace("/");
    return null;
  }

  return <>{children}</>;
}
