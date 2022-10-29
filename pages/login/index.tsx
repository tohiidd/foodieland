import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaFacebookF, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import Spinner from "@/components/Spinner/Spinner";
import { errorMessage as errorToast, successMessage } from "@/utils/toastMessages";
import { useMutation } from "react-query";
import axios from "axios";
import AuthContext from "contexts/authContext";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { replace, pathname } = useRouter();
  const { login, isLoggedIn } = useContext(AuthContext);

  const loginMutation = useMutation(
    async (data: any) => {
      const response = await axios.post("http://localhost:3000/api/auth", data);
      return response.data.data;
    },
    {
      onSuccess: (response) => {
        login(response.token);
        successMessage("Login successfully!");
        replace("/panel/recipes/list");
      },
      onError: (error: Error) => {
        errorToast(error.message);
        setIsLoading(false);
      },
    }
  );

  const submitHandler = async (event: FormEvent<any>) => {
    event.preventDefault();
    setIsLoading(true);
    const email = event.currentTarget.elements?.email.value;
    const password = event.currentTarget.elements?.password.value;

    if (email.trim().length === 0 || password.trim().length < 6) {
      setErrorMessage("inputs are required!");
      setIsLoading(false);
      return;
    }

    loginMutation.mutate({ email, password });
  };
  // useEffect(() => {
  //   if (isLoggedIn && pathname.includes("/login")) {
  //     typeof window !== "undefined" && replace("/");
  //   }
  //   setIsPageLoading(false);
  // }, []);
  // if (isPageLoading) {
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center">
  //       <Spinner full />
  //     </div>
  //   );
  // }
  // if (isLoggedIn) {
  //   typeof window !== "undefined" && replace("/");
  // }
  return (
    <section className="h-[100vh] bg-[#F4F5FA]">
      <div className="h-full flex justify-center items-center">
        <div className="flex sm:mx-4 bg-white h-full sm:h-auto w-full justify-center rounded-md flex-col z-10 items-center sm:w-[400px] text-center shadow-lg">
          <div className="flex items-center">
            <h1 className="py-4 rounded-md text-2xl font-lobster">Foodieland.</h1>
          </div>
          <div className="mx-6 w-[85%] text-center sm:text-left text-slate-700">
            <div className="flex justify-center sm:justify-start">
              <h2 className="text-2xl font-semibold text-slate-600">Welcome To Foodieland!</h2>
            </div>
            <p className="text-gray-400 text-sm mt-1">Please enter your admin account credentials. </p>
          </div>
          <form className="w-[85%] mx-6 my-4" onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="w-full border-2 rounded-md p-3 outline-none"
                placeholder="email"
                name="email"
                value="admin@gmail.com"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="w-full border-2 rounded-md p-3 outline-none"
                placeholder="password"
                name="password"
                value="123456"
              />
              {errorMessage && <p className="pl-1 text-left text-red-500 text-sm font-medium ">{errorMessage}</p>}
            </div>
            <div className=" w-full mb-1 text-left">
              <label className="cursor-pointer select-none">
                <input className="mx-2" type="checkbox" />
                <span className="text-slate-600">Remember Me</span>
              </label>
            </div>
            <button
              className="bg-mainBlue uppercase text-white w-full rounded-md py-2 hover:bg-darkerBlue transition-all relative"
              type="submit"
            >
              {isLoading ? <Spinner /> : "login"}
            </button>
          </form>
          <div className="text-center my-2 w-[85%] sm:w-full">
            <div className="flex justify-center text-2xl mb-4 w-full">
              <span className="mx-4 cursor-pointer">
                <FaFacebookF className="text-[#497CE2]" />
              </span>
              <span className="mx-4 cursor-pointer">
                <FaTwitter className="text-[#1DA1F2]" />
              </span>
              <span className="mx-4 cursor-pointer">
                <FaGithub />
              </span>
              <span className="mx-4 cursor-pointer">
                <FaGoogle className="text-[#DB4437]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
