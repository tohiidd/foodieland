import { ChangeEvent } from "react";
import { categories } from "@/components/Categories/data";
import { chefs } from "@/utils/data";

interface Props {
  addInputValueHandler: (event: ChangeEvent<any>) => void;
  inputs: any;
}
function RecipeDetailsFrom({ addInputValueHandler, inputs }: Props) {
  return (
    <div className=" bg-white rounded w-full lg:w-[48%]">
      <div className="p-4 border-b border-gray-100">
        <h1 className="font-semibold">ADD RECIPE FORM</h1>
      </div>
      <div className="p-4">
        <div>
          <label htmlFor="title"> name</label>
          <input
            type="text"
            name="title"
            className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
            placeholder="name..."
            value={inputs.title}
            onChange={addInputValueHandler}
          />
        </div>
        <div className="flex gap-3 mt-4">
          <div className="w-1/2">
            <label htmlFor="category">select category</label>
            <select
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              name="category"
              value={inputs.category}
              onChange={addInputValueHandler}
            >
              {categories.map(({ id, name }) => (
                <option value={name} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 ">
            <label htmlFor="chef">select chef</label>
            <select
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              name="chef"
              value={inputs.chef}
              onChange={addInputValueHandler}
            >
              {chefs.map(({ id, name }) => (
                <option value={name} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <div className="w-1/2">
            <label htmlFor="title">cook time</label>
            <input
              type="text"
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              name="cookTime"
              placeholder="15 min"
              value={inputs.cookTime}
              onChange={addInputValueHandler}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="title">prep time</label>
            <input
              type="text"
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              name="prepTime"
              placeholder="10 min"
              value={inputs.prepTime}
              onChange={addInputValueHandler}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="description">description</label>
          <textarea
            name="description"
            cols={30}
            rows={10}
            className=" border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 block h-40 resize-none"
            value={inputs.description}
            onChange={addInputValueHandler}
          />
        </div>
        <div className="mt-4 flex  justify-center flex-wrap gap-4">
          <div className="basis-[47%] lg:basis-[30%]">
            <label htmlFor="title">calories</label>
            <input
              type="text"
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              name="calories"
              placeholder="219 kcal"
              value={inputs.calories}
              onChange={addInputValueHandler}
            />
          </div>
          <div className="basis-[47%] lg:basis-[30%]">
            <label htmlFor="title">carbohydrate</label>
            <input
              type="text"
              name="carbohydrate"
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              placeholder="22.3 g"
              value={inputs.carbohydrate}
              onChange={addInputValueHandler}
            />
          </div>
          <div className="basis-[47%] lg:basis-[30%]">
            <label htmlFor="title">cholesterol</label>
            <input
              type="text"
              name="cholesterol"
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              placeholder="38.3 mg"
              value={inputs.cholesterol}
              onChange={addInputValueHandler}
            />
          </div>
          <div className="basis-[47%] lg:basis-[30%]">
            <label htmlFor="title">protein</label>
            <input
              type="text"
              name="protein"
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              placeholder="9.3 g"
              value={inputs.protein}
              onChange={addInputValueHandler}
            />
          </div>
          <div className="basis-[47%] lg:basis-[30%]">
            <label htmlFor="title">totalFat</label>
            <input
              type="text"
              name="totalFat"
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              placeholder="10 g"
              value={inputs.totalFat}
              onChange={addInputValueHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailsFrom;
