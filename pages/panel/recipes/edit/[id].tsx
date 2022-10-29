import { FormEvent, useState, ChangeEvent, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import RecipeDetailsFrom from "@/components/Panel/Recipes/RecipeDetailsFrom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getRecipe, updateRecipe } from "@/services/recipesApi";
import { IDirection, IIngredients } from "@/types/index";
import { errorMessage, successMessage } from "@/utils/toastMessages";
import RecipeMediaForm from "@/components/Panel/Recipes/RecipeMediaForm";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const initialInputsState = {
  title: "",
  image: "",
  banner: "",
  video: { name: "", url: "" },
  category: "breakfast",
  chef: "Marcellus H. Waddell",
  description: "",
  cookTime: "",
  prepTime: "",
  calories: "",
  carbohydrate: "",
  cholesterol: "",
  protein: "",
  totalFat: "",
};

function EditRecipePage() {
  const [inputs, setInputs] = useState(initialInputsState);
  const [video, setVideo] = useState({ name: "", url: "" });
  const [directions, setDirections] = useState<IDirection[]>([]);
  const [ingredients, setIngredients] = useState<IIngredients>({ main: [], sauce: [] });

  const router = useRouter();
  const recipeId = typeof router.query?.id === "string" ? router.query.id : "undefined";

  const queryClient = useQueryClient();
  const { data: recipe, isSuccess } = useQuery(["recipes", recipeId], () => getRecipe(recipeId));
  console.log(recipe);

  const editRecipeMutation = useMutation(updateRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipes");
      successMessage("Recipe updated successfully.");
      router.push("/panel/recipes/list");
    },
    onError: (error: Error) => {
      errorMessage(error.message);
    },
  });

  type Input = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const addInputValueHandler = (event: ChangeEvent<Input>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const discardHandler = () => {
    setInputs(initialInputsState);
    setVideo({ name: "", url: "" });
    setIngredients({ main: [], sauce: [] });
    setDirections([]);
  };

  const submitHandler = (event: FormEvent<any>) => {
    event.preventDefault();

    const editedRecipe = {
      _id: recipe?._id,
      title: inputs.title,
      image: inputs.image,
      banner: inputs.banner,
      video: video.url,
      category: inputs.category,
      chef: inputs.chef,
      description: inputs.description,
      cookTime: inputs.cookTime,
      prepTime: inputs.prepTime,
      nutrition: {
        calories: inputs.calories,
        carbohydrate: inputs.carbohydrate,
        cholesterol: inputs.cholesterol,
        protein: inputs.protein,
        totalFat: inputs.totalFat,
      },
      directions,
      ingredients,
    };
    editRecipeMutation.mutate(editedRecipe);
  };

  useLayoutEffect(() => {
    if (isSuccess) {
      setInputs({
        title: recipe.title,
        image: recipe.image,
        banner: recipe.banner,
        video: { name: "", url: recipe.video },
        category: recipe.category,
        chef: recipe.chef,
        description: recipe.description,
        cookTime: recipe.cookTime,
        prepTime: recipe.prepTime,
        calories: recipe.nutrition.calories,
        carbohydrate: recipe.nutrition.carbohydrate,
        cholesterol: recipe.nutrition.cholesterol,
        protein: recipe.nutrition.protein,
        totalFat: recipe.nutrition.totalFat,
      });
      setDirections(recipe.directions);
      setIngredients(recipe.ingredients);
    }
  }, [recipeId, isSuccess]);

  return (
    <section className="P-4 sm:P-8 max-w-7xl xl:mx-auto">
      <form
        className=" text-sm capitalize font-inter text-[#212529] flex items-baseline gap-6 flex-wrap"
        onSubmit={submitHandler}
      >
        <RecipeDetailsFrom addInputValueHandler={addInputValueHandler} inputs={inputs} />
        <RecipeMediaForm
          setInputs={setInputs}
          inputs={inputs}
          video={video}
          setVideo={setVideo}
          discardHandler={discardHandler}
          directions={directions}
          setDirections={setDirections}
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </form>
    </section>
  );
}

export default EditRecipePage;
