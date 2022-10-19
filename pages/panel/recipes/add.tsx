import { useRef, FormEvent } from "react";
import Image from "next/image";
import { BiImageAdd } from "react-icons/bi";
import { categories } from "@/components/Categories/data";
import TextEditor from "@/components/Panel/TextEditor/TextEditor";
import { chefs } from "data";

function AddRecipePage() {
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const bannerUploadRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="p-8 ">
      <form className=" text-sm capitalize font-inter text-[#212529] flex gap-6 " onSubmit={submitHandler}>
        <div className=" bg-white rounded w-1/2">
          <div className="p-4 border-b border-gray-100">
            <h1 className="font-semibold">ADD RECIPE FORM</h1>
          </div>
          <div className="p-4">
            <div>
              <label htmlFor="title">recipe name</label>
              <input
                type="text"
                className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
                placeholder="Recipe name..."
              />
            </div>
            <div className="flex gap-3 mt-4">
              <div className="w-1/2">
                <label htmlFor="category">select category</label>
                <select className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 ">
                  {categories.map(({ id, name }) => (
                    <option value={name} key={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 ">
                <label htmlFor="chef">select chef</label>
                <select className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 ">
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
                  placeholder="15 min"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="title">prep time</label>
                <input
                  type="text"
                  className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
                  placeholder="10 min"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="description">description</label>
              <textarea
                name="description"
                cols={30}
                rows={10}
                className=" border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 block "
              />
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded w-1/2">
          <div className="flex gap-4 mb-3">
            <div className="w-1/2">
              <label htmlFor="image">recipe image</label>
              <input
                type="file"
                className="hidden border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
                ref={imageUploadRef}
              />
              <div
                className="flex items-center justify-center cursor-pointer mt-3 rounded-sm aspect-square bg-gray-200 w-full "
                onClick={() => imageUploadRef?.current?.click()}
              >
                <BiImageAdd className="text-[3rem]" />
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="image">recipe banner</label>
              <input
                type="file"
                className="hidden border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
                ref={bannerUploadRef}
              />
              <div
                className="flex items-center justify-center cursor-pointer mt-3 rounded-sm aspect-square bg-gray-200 w-full "
                onClick={() => bannerUploadRef?.current?.click()}
              >
                <BiImageAdd className="text-[3rem]" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="image">recipe video</label>
            <input
              type="file"
              className=" border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
              placeholder="Prep time..."
            />
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddRecipePage;
