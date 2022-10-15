import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../UI/Button";

interface Props {
  placeholder: string;
}
function SearchBar({ placeholder }: Props) {
  const router = useRouter();
  const searchValue = (router?.query?.search as string) ?? "";
  const [value, setValue] = useState(searchValue);
  let categoryQuery = router?.query?.category as string;

  const searchHandler = () => {
    if (value.trim().length === 0) return;

    let query: any = { search: value };
    if (categoryQuery) {
      query.category = categoryQuery;
    }
    router.push({
      pathname: router.pathname,
      query,
    });
  };
  return (
    <div className="w-full  sm:w-[90%]  md:w-[80%] xl:w-full lg:w-[70%] mx-auto h-max flex justify-center align-center my-8">
      <div className="xl:w-1/2 w-full h-16 md:h-18 rounded-[20px] 2sm:ml-5  text-center relative border-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className=" w-full h-full outline-none xl:px-5 px-3 rounded-[20px]"
          placeholder={placeholder}
        />
        <Button
          className="w-[25%] lg:w-[23%] h-[90%]  absolute right-1 text-center  top-[2px] xl:text-md "
          onClick={searchHandler}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
