import Image from "next/image";
import Link from "next/link";
import { IArticle } from "../../types";
import { getDate } from "../../utils/getDate.";

function Article({ id, img, title, description, author, profile, createdAt }: IArticle) {
  const date = getDate(createdAt);
  return (
    <article className="flex flex-col sm:flex-row mb-8 gap-4  rounded-xl ">
      <div className=" basis-[35%] ">
        <Link href={`/blog/${id}`}>
          <Image
            src={img}
            alt="food"
            width={300}
            height={200}
            layout="responsive"
            className="w-full h-full rounded-[15px] object-cover cursor-pointer"
          />
        </Link>
      </div>
      <div className="basis-[65%] relative pb-12">
        <div className="text-center sm:text-left">
          <Link href={`/blog/${id}`}>
            <h4 className="text-xl xl:text-2xl font-bold cursor-pointer">{title}</h4>
          </Link>
          <p className="text-secondary mt-3 sm:mt-2 text-xs xl:text-base article-description-paragraph">
            {description}
          </p>

          <div className="flex items-center justify-center sm:justify-start mt-4 sm:mt-0 w-full absolute bottom-2">
            <div className="flex items-center   ">
              <Image src={profile} alt="author of blog" width={30} height={30} className="w-8 h-8  rounded-[50%]" />

              <p className=" m-[2px] ml-2 font-semibold text-sm  ">{author}</p>
            </div>
            <p className="ml-6 text-gray-500 text-xs text-center ">{date} </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Article;
