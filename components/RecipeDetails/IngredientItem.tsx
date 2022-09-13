import { useState } from "react";
import { icons } from "../../services/utils/icons";

interface Props {
  id: string;
  text: string;
}

function IngredientItem({ id, text }: Props) {
  const [checked, setChecked] = useState(false);
  return (
    <div className=" border-b border-gray-300 border-solid flex gap-4 py-6">
      <div className="pt-1 relative">
        <input
          type="checkbox"
          id={`${id}`}
          className="w-6 h-6 absolute opacity-0 cursor-pointer"
          onClick={() => setChecked(!checked)}
        />
        <label htmlFor={`${id}`} className="flex cursor-pointer">
          <span className="w-5 h-5 md:w-6 md:h-6 rounded-[50%] border-2 border-solid border-gray-400 "></span>
          {checked && (
            <span className=" child:w-5 md:child:w-6 absolute cursor-pointer">
              {icons.checked()}
            </span>
          )}
        </label>
      </div>
      <div className="relative">
        <h4
          className={`${
            checked
              ? "after:content-[' '] after:absolute after:top-[15px] after:left-0 after:w-full after:h-[2px] after:bg-[#00000017] !text-[#00000017]"
              : null
          } text-lg font-medium transition-all `}
        >
          {text}
        </h4>
      </div>
    </div>
  );
}

export default IngredientItem;
