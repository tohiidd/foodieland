import { useRouter } from "next/router";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import Container from "../../components/UI/Container";
import { recipes } from "../../services/data/recipe";

function RecipePage() {
  const router = useRouter();
  const recipe = recipes?.find((recipe) => recipe.id === router.query.recipe);

  return (
    <Container className="mt-20 ">
      <RecipeDetails recipe={recipe!} />
    </Container>
  );
}

export default RecipePage;
