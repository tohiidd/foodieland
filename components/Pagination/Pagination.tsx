import { Dispatch, useEffect, SetStateAction } from "react";
import { icons } from "@/utils/icons";
import { useRouter } from "next/router";
interface Props {
  postPerPage: number;
  totalPosts: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function Pagination({ postPerPage, totalPosts, currentPage, setCurrentPage }: Props) {
  const { pathname } = useRouter();
  const pageNumber: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumber.push(i);
  }

  const clickHandler = (page: number) => () => {
    setCurrentPage(page);
    const topDist = pathname.includes("/panel/") ? 50 : 150;

    window.scroll({
      top: topDist,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full h-20   flex justify-center items-center  mt-6">
      <ul className={` xl:w-1/2 w-full h-1/2  flex justify-center   `}>
        <li
          onClick={clickHandler(currentPage - 1)}
          className={`${
            currentPage === 1 && "invisible"
          } blog-page-arrow w-10 h-10  mr-2 text-center flex justify-center items-center  text-black border-2 border-gray-200
            rounded-md cursor-pointer hover:bg-gray-100 transition-all child:w-3`}
        >
          {icons.arrowLeft()}
        </li>

        {pageNumber.map((number, index) => (
          <li
            key={index}
            onClick={clickHandler(number)}
            className={` w-10 flex justify-center items-center mr-2    border-gray-200 border-2 rounded-md cursor-pointer 
            transition-all ${
              pageNumber[index] == currentPage ? "bg-black text-white border-0 hover:bg-black" : "hover:bg-gray-100 "
            }`}
          >
            {number}
          </li>
        ))}

        <li
          onClick={clickHandler(currentPage + 1)}
          className={`${
            currentPage === pageNumber.length && "invisible"
          } blog-page-arrow w-10 h-10  mr-2 text-center flex justify-center items-center  text-black border-2  border-gray-200 
           rounded-md cursor-pointer hover:bg-gray-100 transition-all child:w-3`}
        >
          {icons.arrowRight()}
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
