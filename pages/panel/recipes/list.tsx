import { getRecipes } from "@/services/recipesApi";
import Image from "next/image";
import { useQuery } from "react-query";

function RecipesListPage() {
  const { data: recipesData } = useQuery("recipes", () => getRecipes());
  const recipes = recipesData?.data;
  const total = recipesData?.total;

  return (
    <section className="p-8">
      <div className="flex gap-12">
        {recipes?.map((recipe) => (
          <div
            key={recipe._id}
            className="basis-1/3 bg-white shadow-[0_1px_6px_1px_rgb(69,65,78,0.1)] rounded border border-solid overflow-hidden"
          >
            <div>
              <Image src={recipe.image} alt={recipe.title} width={250} height={150} layout="responsive" />
            </div>
            <div className="p-3">
              <h4 className="line-clamp-1 font-medium mb-2">{recipe.title}</h4>
              <p className="line-clamp-3 text-secondary text-sm mb-4 font-medium">{recipe.description}</p>
              <div className="flex justify-between">
                <button className="text-white text-sm bg-red-500 rounded py-1 px-3 hover:bg-red-600 ">Remove</button>
                <button className="text-white text-sm bg-gray-900 hover:bg-black rounded py-1 px-4">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecipesListPage;
