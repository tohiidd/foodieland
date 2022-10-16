import { getRecipes } from "@/services/recipesApi";
import Image from "next/image";
import { useQuery } from "react-query";
import { IRecipe } from "../../types";

interface Props {
  title: string;
  banner?: boolean;
}
function RecipeList({ title, banner }: Props) {
  const { data: recipesData, isLoading } = useQuery("recipes", () => getRecipes());
  const recipes = recipesData?.data ?? [];

  return (
    <div className="basis-[100%] lg:basis-[33%]">
      <div className="mb-10">
        <h2 className="font-semibold text-3xl md:text-4xl capitalize">{title}</h2>
      </div>
      <div>
        {recipes.slice(0, 4).map((recipe: IRecipe) => (
          <div key={recipe._id} className="flex gap-4 mb-6 cursor-pointer">
            <div className="w-[180px] lg:w-[140px] xl:w-[180px]">
              <Image
                src={recipe.image}
                alt="recipe"
                width={280}
                height={220}
                layout="responsive"
                className="rounded-[20px] "
              />
            </div>
            <div className="flex flex-col justify-around min-w-[60%] max-w-[60%]">
              <h6 className="font-semibold text-base line-clamp-2">{recipe.title}</h6>
              <span className="text-secondary font-normal text-sm">{recipe.chef}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`${banner ? "  lg:block " : ""}relative hidden bg-green-900 mt-20 bg-contain bg-no-repeat`}>
        <p className="font-lobster text-2xl text-white absolute top-3 left-1/2 -translate-x-[50%] w-4/5 xl:w-1/2 text-center">
          Don’t forget to eat healthy food
        </p>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/others%2FStar-1.png?alt=media&token=0102d12b-4979-44a8-935e-4a77a4ae9e1f"
          alt="star"
          width={410}
          height={410}
          className="w-full"
        />
        <div className="absolute top-[58%] left-1/2 z-10 w-4/5 h-4/5 -translate-x-[50%] -translate-y-[50%]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/others%2Ffood-21.png?alt=media&token=34db4470-fd11-4a69-aee7-74db142b94a7"
            alt="chicken"
            layout="fill"
          />
        </div>

        <span className="text-gray-400 text-center text-sm absolute bottom-4 left-1/2 -translate-x-[50%]">
          www.foodieland.com
        </span>
      </div>
    </div>
  );
}

export default RecipeList;
