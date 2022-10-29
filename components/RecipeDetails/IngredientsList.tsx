import IngredientItem from "./IngredientItem";

interface Props {
  main: string[];
  sauce: string[];
}

function IngredientsList({ main, sauce }: Props) {
  return (
    <div>
      <div className="mb-14">
        <h2 className="font-semibold text-3xl md:text-4xl">Ingredients</h2>
      </div>
      <div className=" mb-14">
        <h2 className="font-semibold mb-4 text-xl md:text-2xl">For main dish</h2>
        {main.map((text: string) => (
          <IngredientItem key={text} id={text} text={text} />
        ))}
      </div>
      <div className="mb-14">
        <h2 className="font-semibold mb-4 text-xl md:text-2xl">For the sauce</h2>
        {sauce.map((text: string) => (
          <IngredientItem key={text} id={text} text={text} />
        ))}
      </div>
    </div>
  );
}

export default IngredientsList;
