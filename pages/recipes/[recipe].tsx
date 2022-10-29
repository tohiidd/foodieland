import dbConnect from "services/dbConnect";
import Recipe from "@/models/Recipe";
import { IRecipe } from "@/types/index";
import { GetServerSidePropsContext } from "next";
import RecipeList from "../../components/Recipe/RecipeList";
import Recipes from "../../components/Recipe/Recipes";
import Direction from "../../components/RecipeDetails/Direction";
import IngredientsList from "../../components/RecipeDetails/IngredientsList";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import Subscribe from "../../components/Subscribe/Subscribe";
import Container from "../../components/UI/Container";
import Title from "../../components/UI/Title";
import { stringify } from "@/utils/stringify";

interface Props {
  recipe: IRecipe;
}

function RecipePage({ recipe }: Props) {
  return (
    <Container className="mt-20 ">
      <RecipeDetails recipe={recipe} />
      <div className="flex flex-wrap lg:flex-nowrap gap-10 font-inter my-10 lg:my-20">
        <div className="basis-[100%] lg:basis-[66%]">
          <IngredientsList main={recipe.ingredients.main} sauce={recipe.ingredients.sauce} />
          <div className="mt-14 sm:mt-24">
            <div className=" mb-12">
              <h2 className="font-semibold text-3xl md:text-4xl">Directions</h2>
            </div>
            <div>
              {recipe.directions.map((dir, index) => (
                <Direction key={dir.title} title={dir.title} description={dir.description} number={index} />
              ))}
            </div>
          </div>
        </div>
        <RecipeList title="other recipes" banner />
      </div>
      <Subscribe />
      <div className="mt-16 md:mt-32">
        <Title className="mb-16 capitalize">you may like these recipes too</Title>
        <Recipes len={4} />
      </div>
    </Container>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context?.params?.recipe;
  await dbConnect();

  const recipe = await Recipe.findById(id);

  return {
    props: { recipe: stringify(recipe) },
  };
}

export default RecipePage;
