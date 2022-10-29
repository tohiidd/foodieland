import { GetServerSidePropsContext } from "next";
import Recipes from "../../components/Recipe/Recipes";
import Subscribe from "../../components/Subscribe/Subscribe";
import Title from "../../components/UI/Title";
import { icons } from "../../utils/icons";
import { getDate } from "../../utils/getDate.";
import Image from "next/image";
import Container from "../../components/UI/Container";
import { IArticle } from "@/types/index";
import dbConnect from "@/services/dbConnect";
import Article from "@/models/Article";
import { stringify } from "@/utils/stringify";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import { authors } from "data";

interface Props {
  article: IArticle;
}

function ArticlePage({ article }: Props) {
  const { _id, title, description, image, createdAt, author: authorName, shortDescription } = article;

  const date = getDate(createdAt);
  const authorDetails = authors.find((author) => author.name === authorName);

  const contentState = convertFromRaw(JSON.parse(description));
  const editorState = EditorState.createWithContent(contentState);
  return (
    <Container className="mt-20 ">
      <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl mt-24 text-center">{title}</h1>
      <div className="flex 2sm:flex-row flex-col justify-center mb-[44px] mt-12">
        <div className="flex items-center justify-center 2sm:mb-auto mb-[20px]">
          <div className="w-[40px] h-40px ">
            <Image
              src={authorDetails?.image!}
              alt="author"
              width={45}
              height={45}
              className="mx-auto flex w-8 h-8 object-cover rounded-[50%]"
            />
          </div>
          <p className="flex ml-[15px] justify-center font-bold">{authorName}</p>
        </div>
        <div className="flex items-center 2sm:border-l-[1px] justify-center 2sm:border-r-gray-100 2sm:ml-[61px] px-[24px]">
          <p className="font-medium text-sm  text-secondary">{date}</p>
        </div>
      </div>

      <p className="text-center m-auto w-[80%] mb-[71px] text-secondary">{shortDescription}</p>
      <div className=" mb-[71px]  h-[300px] sm:h-[400px] md:h-[500px] xl:h-[600px] relative">
        <Image
          src={image}
          alt="article"
          width={300}
          height={200}
          layout="fill"
          className="rounded-3xl w-full  object-cover"
        />
      </div>
      <div className="flex justify-center flex-wrap">
        <div className="basis-[100%] lg:basis-[66%]">
          <Editor editorState={editorState} readOnly onChange={() => {}} />
        </div>
        <div className="basis-[100%] lg:basis-[20%] ">
          <h4 className="mb-[32px] font-semibold text-sm text-center">SHARE THIS ON:</h4>
          <div className="flex flex-row justify-center items-center lg:flex-col">
            <span className="blog-post-icon cursor-pointer lg:mb-[48px] ">{icons.facebook()}</span>
            <span className="blog-post-icon cursor-pointer lg:mb-[48px] mx-[48px] xl:mx-auto">{icons.instagram()}</span>
            <span className="blog-post-icon cursor-pointer lg:mb-[48px] ">{icons.twitter()}</span>
          </div>
        </div>
      </div>
      <Subscribe />

      <div className="mt-16 md:mt-32">
        <Title className="mb-16 capitalize">you may like these recipes too</Title>
        <Recipes len={4} />
      </div>
    </Container>
  );
}

export default ArticlePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context?.params?.article;
  await dbConnect();

  const article = await Article.findById(id);

  return {
    props: {
      article: stringify(article),
    },
  };
}
