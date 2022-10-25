import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import { authors } from "data";
import TextEditor from "../TextEditor/TextEditor";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { fileUploader } from "@/utils/fileUploader";
import { IArticle } from "@/types/index";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getArticle } from "@/services/articlesApi";

interface Props {
  sendData: (article: IArticle) => void;
}
function ArticleDetailsForm({ sendData }: Props) {
  const [inputs, setInputs] = useState({ title: "", author: "Pragya Subedy", shortDescription: "" });
  const [image, setImage] = useState({ name: "", url: "" });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const imageInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const articleId = typeof router.query?.id === "string" ? router.query.id : "undefined";
  const isEditPage = router.pathname.includes("/edit/");
  const { data: article, isSuccess } = useQuery(["articles", articleId], () => getArticle(articleId));

  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const data = await fileUploader(file);

    setImage({ name: data.original_filename, url: data.url });
  };

  type Input = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const addInputValueHandler = (event: ChangeEvent<Input>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const discardHandler = () => {
    setInputs({ title: "", author: "", shortDescription: "" });
    setEditorState(EditorState.createEmpty());
    setImage({ name: "", url: "" });
  };

  const submitHandler = (event: FormEvent<any>) => {
    event.preventDefault();

    const newArticle = {
      title: inputs.title,
      image: image.url,
      author: inputs.author,
      shortDescription: inputs.shortDescription,
      description: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    };

    sendData(newArticle);
  };
  useEffect(() => {
    if (isSuccess) {
      setInputs({ title: article.title, author: article.author, shortDescription: article.shortDescription });
      setImage({ name: "", url: article?.image! });
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(article.description ?? ""))));
    }
  }, [articleId, isSuccess, article]);
  return (
    <form className=" text-sm capitalize p-4" onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">article name</label>
        <input
          type="text"
          name="title"
          className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
          placeholder="name..."
          value={inputs.title}
          onChange={addInputValueHandler}
        />
      </div>
      <div className="flex gap-3 mt-3 flex-col sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label htmlFor="author">select author</label>
          <select
            className="block border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 "
            name="author"
            value={inputs.author}
            onChange={addInputValueHandler}
          >
            {authors.map(({ id, name }) => (
              <option value={name} key={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/2">
          <label htmlFor="image">article image </label>

          <input type="file" className="hidden " ref={imageInputRef} name="image" onChange={uploadFileHandler} />
          <label
            className="text-gray-400 font-medium border border-gray-300 outline-blue-300  rounded-sm w-full p-[7px] mt-2 block relative"
            style={{ cursor: image.url ? "default" : "pointer" }}
            onClick={() => !image.url && imageInputRef?.current?.click()}
          >
            {image.name || "upload image..."}
            <span className="absolute right-0 top-0 bg-gray-200 text-gray-400 flex items-center px-1 bottom-0">
              Browse
            </span>
          </label>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="description">short description</label>
        <textarea
          name="shortDescription"
          cols={30}
          rows={10}
          className=" border border-gray-300 outline-blue-300 rounded-sm w-full p-2 mt-2 block h-40 resize-none"
          value={inputs.shortDescription}
          onChange={addInputValueHandler}
        />
      </div>
      <div className="mt-8">
        <label htmlFor="description">description</label>
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
      </div>
      <div className="mt-8 flex justify-end flex-col gap-4 sm:flex-row ">
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
    </form>
  );
}

export default ArticleDetailsForm;
