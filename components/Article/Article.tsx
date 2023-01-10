import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IArticle } from "@/types/index";
import { getDate } from "@/utils/getDate.";
import { authors } from "@/utils/data";

interface Props {
  article: IArticle;
  removeHandler?: (id: string) => void;
}

function Article({ article, removeHandler }: Props) {
  const [open, setOpen] = useState(false);
  const { _id, title, createdAt, image, author: authorName, shortDescription } = article;
  const date = getDate(createdAt);
  const router = useRouter();
  const inPanel = router.pathname.includes("/panel");
  const authorDetails = authors.find((author) => author.name === authorName);

  return (
    <article
      className={`${inPanel ? "bg-white p-4 " : ""} flex flex-col sm:flex-row  gap-4  rounded-xl w-full relative`}
    >
      <div className=" basis-[35%] ">
        <Link href={`/blog/${_id}`}>
          <Image
            src={image}
            alt="food"
            width={300}
            height={200}
            layout="responsive"
            className="w-full h-full rounded-[15px] object-cover cursor-pointer"
          />
        </Link>
      </div>
      <div className={`${inPanel ? "basis-[60%]" : "basis-[65%]"} relative pb-12`}>
        <div className="text-center sm:text-left">
          <Link href={`/blog/${_id}`}>
            <h4 className="text-xl xl:text-2xl font-bold cursor-pointer">{title}</h4>
          </Link>

          <p className="text-secondary text-xs xl:text-base line-clamp-4 leading-[20px] mt-2 ">{shortDescription}</p>

          <div className="flex items-center justify-center sm:justify-start mt-4 sm:mt-0 w-full absolute bottom-2">
            <div className="flex items-center   ">
              <Image
                src={authorDetails?.image!}
                alt="author of blog"
                width={30}
                height={30}
                objectFit="cover"
                className="w-8 h-8  rounded-[50%] "
              />

              <p className=" m-[2px] ml-2 font-semibold text-sm  ">{authorName}</p>
            </div>
            <p className="ml-6 text-gray-500 text-xs text-center ">{date} </p>
          </div>
        </div>
      </div>
      <div className={`${inPanel ? "basis-[5%]" : "hidden"} absolute sm:relative right-0  text-center`}>
        <div className="relative">
          <button
            className="cursor-pointer rounded-[50%] transition-all hover:bg-gray-100 p-1 "
            onClick={() => setOpen((prev) => !prev)}
          >
            <BsThreeDotsVertical className="text-3xl" />
          </button>
          <ul className={`${open ? "block" : "hidden"} bg-yellow-50 absolute right-0 py-3 px-6 mt-1 rounded`}>
            <li
              className="pb-2 hover:scale-110 hover:text-blue-500 transition-all cursor-pointer"
              onClick={() => {
                router.push(`/panel/articles/edit/${_id}`);
                setOpen(false);
              }}
            >
              Edit
            </li>
            <li
              className=" hover:scale-110 hover:text-blue-500 transition-all cursor-pointer"
              onClick={() => {
                removeHandler!(_id!);
                setOpen(false);
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}

export default Article;
