import Link from "next/link";
import { IArticle } from "../../services/types";
import { getDate } from "../../services/utils/getDate.";

function Article({
  id,
  img,
  title,
  description,
  author,
  profile,
  createdAt,
}: IArticle) {
  const date = getDate(createdAt);
  return (
    <article className="flex flex-col md:flex-row mt-8 gap-4  rounded-xl ">
      <div className=" basis-[35%] ">
        <Link href={`/blogPost/${id}`}>
          <img
            src={`${img}`}
            alt="food"
            className="w-full h-full rounded-[15px] object-cover"
          />
        </Link>
      </div>
      <div className="basis-[65%] relative pb-12">
        <div className="text-center md:text-left">
          <Link href={`/blogPost/${id}`}>
            <h4 className="text-xl xl:text-2xl font-bold ">{title}</h4>
          </Link>
          <p className="text-secondary mt-3 md:mt-2 text-xs xl:text-base article-description-paragraph">
            {description}
          </p>

          <div className="flex items-center justify-center md:justify-start mt-4 md:mt-0 w-full absolute bottom-2">
            <div className="flex items-center   ">
              <img
                src={`${profile}`}
                alt=""
                className="w-8 h-8  rounded-[50%]"
              />

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
