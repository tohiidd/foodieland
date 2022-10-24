import { deleteRecipe, getRecipes } from "@/services/recipesApi";
import { errorMessage, successMessage } from "@/utils/toastMessages";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

function RecipesListPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: recipesData } = useQuery(["recipes"], () => getRecipes());
  const recipes = recipesData?.data;
  const total = recipesData?.total;

  const deleteRecipeMutation = useMutation(deleteRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
      successMessage("Recipe deleted.");
    },
    onError: (error: Error) => {
      errorMessage(error.message);
    },
  });

  const removeHandler = (id: string) => () => {
    deleteRecipeMutation.mutate(id);
  };

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
                <button
                  className="text-white text-sm bg-red-500 rounded py-1 px-3 hover:bg-red-600 "
                  onClick={removeHandler(recipe._id!)}
                >
                  Remove
                </button>
                <Link href={`/panel/recipes/edit/${recipe._id}`}>
                  <button className="text-white text-sm bg-gray-900 hover:bg-black rounded py-1 px-4">Edit</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecipesListPage;
