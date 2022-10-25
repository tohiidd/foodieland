import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { fileUploader } from "@/utils/fileUploader";
import { IDirection, IIngredients } from "@/types/index";
import { BiImageAdd } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";

interface Props {
  video: { name: string; url: string };
  setVideo: Dispatch<SetStateAction<any>>;
  inputs: any;
  setInputs: Dispatch<SetStateAction<any>>;
  discardHandler: () => void;
  setIngredients: Dispatch<SetStateAction<IIngredients>>;
  setDirections: Dispatch<SetStateAction<IDirection[]>>;
  directions: IDirection[];
  ingredients: IIngredients;
}

function RecipeMediaForm({
  video,
  setVideo,
  inputs,
  setInputs,
  discardHandler,
  setDirections,
  setIngredients,
  directions,
  ingredients,
}: Props) {
  const [directionDetails, setDirectionDetails] = useState({ title: "", description: "" });
  const [ingredientTitle, setIngredientTitle] = useState("");
  const [ingredientDish, setIngredientDish] = useState<"main" | "sauce">("main");

  const imageUploadRef = useRef<HTMLInputElement>(null);
  const bannerUploadRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const isEditPage = router.pathname.includes("/edit/");

  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const name = event.target.name;
    const data = await fileUploader(file);

    if (name === "video") {
      setVideo({ name: data.original_filename, url: data.url });
    } else {
      setInputs((prev: any) => ({ ...prev, [name]: data.url }));
    }
  };

  const addDirectionHandler = () => {
    setDirections((prev) => [...prev, { ...directionDetails }]);
    setDirectionDetails({ title: "", description: "" });
  };

  const addIngredientHandler = () => {
    setIngredients((prev) => ({ ...prev, [ingredientDish]: [...prev[ingredientDish], ingredientTitle] }));
    setIngredientTitle("");
  };

  return (
    <div className="p-4 bg-white rounded w-full lg:w-[48%]">
      <div className="flex gap-4 mb-3">
        <div className="w-1/2">
          <label htmlFor="image"> image</label>
          <input type="file" className="hidden  " name="image" ref={imageUploadRef} onChange={uploadFileHandler} />
          <div
            className="flex items-center justify-center  mt-3 rounded-sm aspect-square  w-full !bg-no-repeat !bg-center !bg-contain"
            style={{
              background: inputs.image ? `url(${inputs.image})` : "rgb(229 231 235)",
              cursor: inputs.image ? "default" : "pointer",
            }}
            onClick={() => !inputs.image && imageUploadRef?.current?.click()}
          >
            {!inputs.image && <BiImageAdd className="text-5xl" />}
          </div>
        </div>
        <div className="w-1/2">
          <label htmlFor="banner"> banner</label>
          <input type="file" className="hidden  " name="banner" ref={bannerUploadRef} onChange={uploadFileHandler} />
          <div
            className="flex items-center justify-center cursor-pointer mt-3 rounded-sm aspect-square  w-full  !bg-no-repeat !bg-center !bg-contain"
            style={{
              background: inputs.banner ? `url(${inputs.banner}) ` : "rgb(229 231 235)",
              cursor: inputs.banner ? "default" : "pointer",
            }}
            onClick={() => !inputs.banner && bannerUploadRef?.current?.click()}
          >
            {!inputs.banner && <BiImageAdd className="text-[3rem]" />}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="video"> video</label>
        <div>
          <input type="file" className="hidden " ref={videoInputRef} name="video" onChange={uploadFileHandler} />
          <label
            className="text-gray-400 font-medium border border-gray-300 outline-blue-300  rounded-sm w-full p-1.5 mt-2 block relative"
            style={{ cursor: video.url ? "default" : "pointer" }}
            onClick={() => !video.url && videoInputRef?.current?.click()}
          >
            {video.name || "upload video..."}
            <span className="absolute right-0 top-0 bg-gray-200 text-gray-400 flex items-center px-1 bottom-0">
              Browse
            </span>
          </label>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <label htmlFor="image">directions</label>
          <div className="cursor-pointer" onClick={addDirectionHandler}>
            <FaPlus />
          </div>
        </div>
        <div>
          {directions.length !== 0 &&
            directions.map((dir: { title: string; description: string }, index) => (
              <div key={index} className="line-clamp-1">{`${index + 1}. ${dir.title}`}</div>
            ))}
        </div>
        <div>
          <div>
            <input
              type="text"
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              placeholder="Title"
              value={directionDetails.title}
              onChange={(e) => setDirectionDetails((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <textarea
              name="description"
              cols={30}
              rows={10}
              value={directionDetails.description}
              onChange={(e) => setDirectionDetails((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Description..."
              className=" border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 block h-28 resize-none"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <label htmlFor="ingredients">ingredients</label>
          <div className="cursor-pointer" onClick={addIngredientHandler}>
            <FaPlus />
          </div>
        </div>
        {ingredients.main.length !== 0 && (
          <div>
            <label>main:</label>
            {ingredients.main.map((item, index) => (
              <div key={index} className="line-clamp-1">{`${index + 1}. ${item}`}</div>
            ))}
          </div>
        )}
        {ingredients.sauce.length !== 0 && (
          <div>
            <label>sauce:</label>
            {ingredients.sauce.map((item, index) => (
              <div key={index} className="line-clamp-1">{`${index + 1}. ${item}`}</div>
            ))}
          </div>
        )}
        <div>
          <div>
            <input
              type="text"
              className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              value={ingredientTitle}
              onChange={(e) => setIngredientTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <input
              type="radio"
              name="main"
              id="main"
              checked={ingredientDish === "main"}
              onChange={(e) => setIngredientDish(e.target?.name as "main")}
            />
            <label htmlFor="main">for the main dish</label>
            <input
              type="radio"
              name="sauce"
              id="sauce"
              className="ml-4"
              checked={ingredientDish === "sauce"}
              onChange={(e) => setIngredientDish(e.target?.name as "sauce")}
            />
            <label htmlFor="sauce">for the sauce</label>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between flex-col gap-4 sm:flex-row ">
        <button
          className="bg-gray-900 text-white rounded-md py-2 px-4 w-full sm:w-auto outline-none hover:bg-black transition-all"
          onClick={discardHandler}
        >
          Discard
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 w-full sm:w-auto outline-none hover:bg-blue-600 transition-all"
        >
          {isEditPage ? "Save" : "Publish"}
        </button>
      </div>
    </div>
  );
}

export default RecipeMediaForm;
