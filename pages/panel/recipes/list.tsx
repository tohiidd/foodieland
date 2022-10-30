import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Pagination from "@/components/Pagination/Pagination";
import { deleteRecipe, getRecipes } from "@/services/recipesApi";
import { errorMessage, successMessage } from "@/utils/toastMessages";
import Spinner from "@/components/Spinner/Spinner";

function RecipesListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);
  const queryClient = useQueryClient();

  let queries = `page=${currentPage}&limit=${recipesPerPage}`;

  const { data: recipesData, isLoading } = useQuery(["recipes", queries], () => getRecipes(queries));
  const recipes = recipesData?.data ?? [];
  const total = recipesData?.total ?? 0;

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
    <section className="p-4 sm:p-8 max-w-7xl xl:mx-auto">
      <div className="flex flex-wrap gap-12">
        {isLoading && (
          <div className="py-8 mx-auto  ">
            <Spinner blue />
          </div>
        )}
        {recipes?.map((recipe) => (
          <div
            key={recipe._id}
            className="basis-[100%] sm:basis-[45%] md:basis-[28%] bg-white shadow-[0_1px_6px_1px_rgb(69,65,78,0.1)] rounded border border-solid overflow-hidden"
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
      <div className="w-auto">
        {total / recipesPerPage > 1 && (
          <Pagination
            postPerPage={recipesPerPage}
            totalPosts={total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}

export default RecipesListPage;
