import { FormEvent, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import RecipeDetailsFrom from "@/components/Panel/Recipes/RecipeDetailsFrom";
import { useMutation, useQueryClient } from "react-query";
import { addRecipe } from "@/services/recipesApi";
import { IDirection, IIngredients } from "@/types/index";
import { errorMessage, successMessage } from "@/utils/toastMessages";
import RecipeMediaForm from "@/components/Panel/Recipes/RecipeMediaForm";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

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

function AddRecipePage() {
  const [inputs, setInputs] = useState(initialInputsState);
  const [video, setVideo] = useState({ name: "", url: "" });
  const [directions, setDirections] = useState<IDirection[]>([]);
  const [ingredients, setIngredients] = useState<IIngredients>({ main: [], sauce: [] });

  const router = useRouter();

  const queryClient = useQueryClient();
  const addRecipeMutation = useMutation(addRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
      successMessage("Recipe created successfully.");
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

    const newRecipe = {
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
    addRecipeMutation.mutate(newRecipe);
  };

  return (
    <section className="p-4 sm:p-8 max-w-7xl xl:mx-auto ">
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

export default AddRecipePage;
