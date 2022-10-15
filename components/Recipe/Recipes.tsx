import { recipes } from "../../data/recipe";
import Recipe from "./Recipe";
import { useQuery } from "react-query";
import { getRecipes } from "@/services/recipesApi";
import { IRecipe } from "@/types/index";

interface Props {
  len: number;
}
function Recipes({ len }: Props) {
  const { data: recipesData, isLoading, isError } = useQuery("recipes", () => getRecipes());
  const recipes = recipesData?.data ?? [];

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="flex gap-4 sm:gap-6 justify-center mx-auto xl:justify-between items-center sm:w-full flex-wrap overflow-hidden">
      {recipes.slice(0, len).map(({ image, title, category, _id, cookTime }: IRecipe) => (
        <Recipe key={_id} id={_id} image={image} title={title} category={category} cookTime={cookTime} />
      ))}
    </div>
  );
}

export default Recipes;
