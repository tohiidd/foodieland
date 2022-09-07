import { ChangeEvent } from "react";
import Button from "../UI/Button";

interface Props {
  searchHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
function SearchBar({ searchHandler, placeholder }: Props) {
  return (
    <div className="w-full  sm:w-[90%]  md:w-[80%] xl:w-full lg:w-[70%] mx-auto h-max flex justify-center align-center my-8">
      <div className="xl:w-1/2 w-full h-16 md:h-20 rounded-[20px] 2sm:ml-5  text-center relative border-2">
        <input
          onChange={searchHandler}
          className=" w-full h-full outline-none xl:p-8 p-3 rounded-[20px]"
          placeholder={placeholder}
        />
        <Button className="w-[25%] h-3/4  absolute right-2 text-center  top-[9px] xl:text-md ">
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
