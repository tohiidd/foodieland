import { ingredientsData } from "../../services/data";
import IngredientItem from "./IngredientItem";

function IngredientsList() {
  return (
    <div>
      <div className="mb-14">
        <h2 className="font-semibold text-3xl md:text-4xl">Ingredients</h2>
      </div>
      <div className=" mb-14">
        <h2 className="font-semibold mb-4 text-xl md:text-2xl">
          For main dish
        </h2>
        {ingredientsData.slice(0, 3).map(({ id, text }) => (
          <IngredientItem key={id} id={id} text={text} />
        ))}
      </div>
      <div className="mb-14">
        <h2 className="font-semibold mb-4 text-xl md:text-2xl">
          For the sauce
        </h2>
        {ingredientsData.slice(3, 7).map(({ id, text }) => (
          <IngredientItem key={id} id={id} text={text} />
        ))}
      </div>
    </div>
  );
}

export default IngredientsList;
