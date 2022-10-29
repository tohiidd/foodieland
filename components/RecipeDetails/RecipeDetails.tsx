import { chefs } from "data";
import Image from "next/image";
import { IRecipe } from "../../types";
import { getDate } from "../../utils/getDate.";
import { icons } from "../../utils/icons";
import Title from "../UI/Title";
import NutritionInfo from "./NutritionInfo";

interface Props {
  recipe: IRecipe;
}
function RecipeDetails({ recipe }: Props) {
  const { title, video, description, cookTime, prepTime, nutrition, chef: chefName, createdAt, category } = recipe;
  const readableDate = getDate(createdAt);
  const chefDetails = chefs.find((chef) => chef.name === chefName);

  return (
    <div className=" flex flex-wrap gap-4 ">
      <div className="basis-full lg:basis-[66%] ">
        <div className="text-center lg:text-left">
          <Title className=" xl:text-6xl lg:text-left">{title}</Title>
        </div>
        <div className="flex justify-end lg:justify-start flex-wrap gap-6 sm:gap-2 md:gap-4 my-12">
          <div className="basis-[44%] sm:basis-[23%] flex border-r border-gray-300 border-solid ">
            <div>
              <Image
                src={chefDetails?.image!}
                alt="chief"
                width={45}
                height={45}
                className="mx-auto w-10 h-10 object-cover rounded-[50%]"
              />
            </div>
            <div className=" ml-2 ">
              <span className="font-bold block text-xs md:text-sm xl:text-base">{chefName}</span>
              <span className=" text-[10px] xl:text-[12px]  font-medium">{readableDate}</span>
            </div>
          </div>
          <div className="basis-[44%] sm:basis-[23%] flex items-center sm:border-r border-gray-300 border-solid">
            <span>{icons.timer()}</span>
            <div className="ml-2">
              <span className="font-medium text-xs block">PREP TIME</span>
              <span className="text-sm font-medium text-secondary ">{prepTime}</span>
            </div>
          </div>
          <div className="basis-[44%] sm:basis-[23%] flex items-center border-r border-gray-300 border-solid pl-3 sm:pl-0">
            <span>{icons.timer()}</span>
            <div className="ml-2">
              <span className="font-medium text-xs block">COOK TIME</span>
              <span className="text-sm font-medium text-secondary ">{cookTime}</span>
            </div>
          </div>
          <div className="basis-[44%] sm:basis-[23%] flex items-center text-sm md:text-base">
            <span className="inline-block ">{icons.fork()}</span>
            <span className="inline-block pr-2">{icons.knife()}</span>
            {category}
          </div>
        </div>
        <div className="h-[350px] md:h-[450px] xl:h-[600px]">
          <video src={video} autoPlay muted controls loop className="rounded-3xl h-full object-cover mx-auto" />
        </div>
      </div>
      <div className="basis-full lg:basis-[30%] flex flex-col justify-between">
        <div className="flex justify-center lg:justify-end py-8">
          <div className="text-center">
            <div className="bg-lameBlue rounded-[50%] mb-2 p-7 hover:bg-darkBlue transition-all cursor-pointer">
              <span>{icons.printer()}</span>
            </div>
            <span className="text-xs font-medium">PRINT</span>
          </div>
          <div className="text-center ml-4">
            <div className="bg-lameBlue rounded-[50%] mb-2 p-7 hover:bg-darkBlue transition-all cursor-pointer">
              <span>{icons.share()}</span>
            </div>
            <span className="text-xs font-medium">SHARE</span>
          </div>
        </div>
        <NutritionInfo nutrition={nutrition} />
      </div>
      <div className="mt-10">
        <p className="text-secondary text-base">{description}</p>
      </div>
    </div>
  );
}

export default RecipeDetails;
