import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { icons } from "../../utils/icons";

const menu = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Recipes",
    to: "/recipes",
  },
  {
    name: "Blog",
    to: "/blog",
  },
  {
    name: "Contact",
    to: "/contact",
  },
  {
    name: "About Us",
    to: "/about",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <div className=" border-b-[1px] border-gray-300 font-inter">
      <div className="flex py-5 sm:py-[46px] lg:justify-between flex-row-reverse  justify-between sm:items-center mx-6 sm:mx-[80px] ">
        <div className="hidden sm:flex items-center justify-center md:flex-row text-[19.36px] ">
          <span className="flex justify-center header-icon cursor-pointer">{icons.instagram()}</span>
          <span className="flex justify-center ml-[40px] header-icon cursor-pointer">{icons.twitter()}</span>
          <span className="flex justify-center ml-[40px] header-icon cursor-pointer">{icons.facebook()}</span>
        </div>
        <div className=" lg:order-[0] order-[-1]    relative  items-center">
          <ul
            onClick={() => setOpen((prev) => (prev === true ? false : true))}
            className={`cursor-pointer justify-center items-center lg:hidden  flex  flex-col ${open ? "h-[36px]" : ""}`}
          >
            <li
              className={`w-[30px] h-[8px] bg-black rounded-md inline mb-1 transition-all	 ${
                open ? " rotate-45  absolute" : ""
              }`}
            ></li>
            <li
              className={`w-[30px] h-[8px] bg-black rounded-md inline mb-1  transition-all ${
                open ? " rotate-135" : ""
              }`}
            ></li>
            <li
              className={`w-[30px] h-[8px] bg-black rounded-md inline mb-1 transition-all ${
                open ? " hidden rotate-90" : ""
              }`}
            ></li>
          </ul>
          <ul
            className={`justify-center items-center font-medium font-inter lg:flex lg:flex-row lg:bg-transparent lg:mt-[0px] lg:mr-[0px]
                 right-[120px] lg:right-auto lg:translate-x-0   translate-x-[50%]  text-black  flex-col  none lg:relative overflow-hidden
                   lg:overflow-visible z-30  absolute  mt-[20px]  bg-yellow-50  rounded-md ${open || " hidden"}`}
          >
            {menu.map(({ name, to }, index) => (
              <Link key={index} href={to}>
                <a
                  className={`${
                    pathname === to ? "scale-125 text-blue-500" : ""
                  } flex lg:ml-[60px] lg:py-[0px]  ml-[0px]   py-[20px] lg:w-auto  w-[250px] justify-center hover:scale-125 hover:text-blue-500 transition-all`}
                  onClick={() => setOpen(false)}
                >
                  {name}
                </a>
              </Link>
            ))}
          </ul>
        </div>
        <Link href="/">
          <a className="flex flex-row items-center justify-center font-lobster font-normal text-[24px] sm:mb-[0px] mb-[0px] cursor-pointer">
            Foodieland.
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
