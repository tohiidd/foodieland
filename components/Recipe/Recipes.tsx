import { recipes } from "../../services/data/recipe";
import Recipe from "./Recipe";

interface Props {
  len: number;
}
function Recipes({ len }: Props) {
  return (
    <div className="flex gap-4 sm:gap-6 justify-center mx-auto xl:justify-between items-center sm:w-full flex-wrap overflow-hidden">
      {recipes.slice(0, len).map(({ img, title, category, id, cookTime }) => (
        <Recipe
          key={id}
          id={id}
          img={img}
          title={title}
          category={category}
          cookTime={cookTime}
        />
      ))}
    </div>
  );
}

export default Recipes;
