import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useEffect, useLayoutEffect, useState } from "react";

interface IContext {
  token: null | string;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IContext>({
  token: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { pathname, replace } = useRouter();
  const isLoggedIn = !!token;

  const loginHandler = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  useLayoutEffect(() => {
    setToken(window.localStorage.getItem("token"));
    setLoading(false);
  }, []);

  const contextValue = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner full />
      </div>
    );
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
export default AuthContext;
