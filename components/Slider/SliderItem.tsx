import Image from "next/image";
import Link from "next/link";
import { IRecipe } from "../../services/types";
import { getDate } from "../../services/utils/getDate.";
import { icons } from "../../services/utils/icons";

function SliderItem({
  title,
  banner,
  description,
  id,
  category,
  chef,
  chefImg,
  createdAt,
  cookTime,
}: IRecipe) {
  const readableDate = getDate(createdAt);

  return (
    <div className="carousel-item flex rounded-3xl overflow-hidden font-inter ">
      <div className="hidden md:block basis-1/2 bg-lameBlue p-5 sm:p-7 lg:p-9">
        <div className="flex items-center  bg-white w-32 lg:w-36 rounded-2xl p-2 text-center">
          <Image
            width={"20%"}
            height={"20%"}
            src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/others%2Fimage%2014.png?alt=media&token=089dd2c8-d3f3-4558-ad20-362bfdc9a646"
            alt="hot-recipes"
            className="inline-block"
          />
          <span className="font-bold text-xs lg:text-sm ml-2 ">
            Hot Recipes
          </span>
        </div>
        <div className="mt-4 mb-4 lg:mt-6 lg:mb-6 sm:h-[80px] md:h-[96px] xl:h-[120px]">
          <h2 className=" text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold line-clamp-2">
            {title}
          </h2>
        </div>
        <div className="text-secondary text-xs lg:text-sm  line-clamp-3 ">
          <p>{description} </p>
        </div>
        <div className=" flex lg:text-sm text-xs  font-medium mt-4 mb-0 sm:mb-8 lg:mt-8 lg:mb-14 xl:mb-20">
          <div className="bg-[#0000000D] flex items-center rounded-3xl px-4 py-2 lg:py-2.5">
            <span>
              <i>{icons.timer()}</i>
            </span>
            <span className="ml-2">{cookTime}</span>
          </div>
          <div className="bg-[#0000000D] flex items-center rounded-3xl px-4 py-2 lg:py-2.5 ml-4 ">
            <span className="flex ">
              <i>{icons.fork()}</i>
              <i>{icons.knife()}</i>
            </span>
            <span className="ml-2">{category}</span>
          </div>
        </div>
        <div className=" justify-between hidden sm:flex">
          <div className="flex ">
            <div>
              <Image
                width={"40px"}
                height={"40px"}
                src={chefImg}
                alt="chief"
                className="mx-auto object-cover rounded-[50%]"
              />
            </div>
            <div className="ml-2">
              <span className="font-bold block text-sm lg:text-base">
                {chef}
              </span>
              <span className="carousel-gray-text-color text-xs lg:text-sm font-medium">
                {readableDate}
              </span>
            </div>
          </div>
          <Link href={`recipe/${id}`}>
            <a>
              <div className="bg-black text-white lg:hover:pr-10 transition-all rounded-2xl h-full px-3 lg:px-6 text-xs lg:text-sm flex items-center cursor-pointer ">
                <span className="font-semibold ">View Recipes</span>
                <span className="ml-1 lg:ml-2">{icons.playCircle()}</span>
              </div>
            </a>
          </Link>
        </div>
      </div>

      <div className="basis-full md:basis-1/2 h-72 sm:h-[350px] md:h-auto">
        <Link href={`recipe/${id}`}>
          <div
            className="carousel-bg bg-no-repeat bg-cover w-full h-full bg-center 2xl:h-[600px]"
            style={{
              backgroundImage: `url(${banner})`,
            }}
          ></div>
        </Link>
      </div>
    </div>
  );
}

export default SliderItem;
