import { useState } from "react";
import { icons } from "../../utils/icons";

function Direction({ title, description, number }: any) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex gap-2 md:gap-6 border-b border-gray-300 border-solid mb-10 pb-16">
      <div className="relative pt-1.5">
        <input
          type="checkbox"
          id="111"
          className="w-6 h-6 absolute opacity-0 cursor-pointer"
          onClick={() => setChecked((prevCheck) => !prevCheck)}
        />
        <label htmlFor="111" className="flex ">
          <span className="w-5 h-5 md:w-6 md:h-6 rounded-[50%] border-2 border-solid border-gray-400 "></span>
          {checked && <span className=" child:w-5 md:child:w-6 absolute cursor-pointer">{icons.checked()}</span>}
        </label>
      </div>
      <div>
        <h2 className="font-semibold text-xl md:text-2xl mb-5  ">
          <span>{number + 1}.</span>
          <span>{title}</span>
        </h2>
        <p className="text-secondary text-justify text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
}

export default Direction;
