import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dbConnect from "services/dbConnect";
import { IRecipe } from "@/types/index";
import Pagination from "@/components/Pagination/Pagination";
import Recipe from "@/components/Recipe/Recipe";
import SearchBar from "@/components/SearchBar/SearchBar";
import Subscribe from "@/components/Subscribe/Subscribe";
import Container from "@/components/UI/Container";
import Title from "@/components/UI/Title";
import RecipeModel from "@/models/Recipe";
import { GetServerSidePropsContext } from "next";
import { addFilters } from "@/utils/addFilters";
import { useQuery, useQueryClient } from "react-query";
import { getRecipes } from "@/services/recipesApi";
import { stringify } from "@/utils/stringify";
import { categories } from "@/components/Categories/data";

interface Props {
  recipesList: IRecipe[];
  totalRecipes: number;
}

function RecipesPage({ recipesList, totalRecipes }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);

  const router = useRouter();

  let queries = `page=${currentPage}&limit=${recipesPerPage}`;

  let categoryQuery = router.query.category as string;
  if (categoryQuery) {
    queries = `category=${categoryQuery}`;
  }

  let searchQuery = router.query.search as string;
  if (searchQuery) {
    queries = `${queries}&search=${searchQuery}`;
  }

  const { data: recipesData } = useQuery(["recipes", queries], () => getRecipes(queries), {
    initialData: { data: recipesList, total: totalRecipes },
    refetchOnMount: false,
  });
  const recipes = recipesData?.data ?? [];
  const total = recipesData?.total ?? 0;

  const selectCategoryHandler = (name: string) => () => {
    let queryLength = categoryQuery?.split("/").length;

    if (categoryQuery?.includes(name) && queryLength === 2) {
      delete router.query.category;
      router.push(router);
    } else if (categoryQuery?.includes(name) && queryLength !== 2) {
      router.push({
        pathname: "/recipes",
        query: {
          category: categoryQuery?.replace(`/${name}`, ""),
        },
      });
    } else {
      router.push({
        pathname: "/recipes",
        query: {
          category: `${categoryQuery ? `${categoryQuery}` : ""}/${name}`,
        },
      });
    }
    setCurrentPage(1);
  };

  return (
    <Container className="mt-16 mb-32">
      <div className="mb-14">
        <Title className=" mb-[24px]">Simple and tasty recipes</Title>
      </div>
      <SearchBar placeholder={"search recipes..."} />
      <div>
        <ul className="flex w-full justify-center gap-4 md:gap-8 flex-wrap mb-6 ">
          {categories.map(({ id, name }) => (
            <li
              key={id}
              className={`${
                categoryQuery?.includes(name) ? "bg-blue-100 border-blue-700 text-blue-700 " : ""
              } gap-2 border border-gray-500 text-gray-500 cursor-pointer rounded-3xl py-2 px-4 my-1 md:my-3 transition-all hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 `}
              onClick={selectCategoryHandler(name)}
            >
              <div className="capitalize">{name}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className=" flex gap-6 justify-center  mx-auto   flex-wrap min-h-[600px]">
        {recipes.map(({ image, title, category, _id, cookTime }: IRecipe) => (
          <Recipe key={_id} id={_id!} image={image} title={title} category={category} cookTime={cookTime} />
        ))}
      </div>
      <div className="w-auto">
        {total / recipesPerPage > 1 && (
          <Pagination
            postPerPage={recipesPerPage}
            totalPosts={total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      <Subscribe />
    </Container>
  );
}

export default RecipesPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await dbConnect();

  let filters = addFilters(context.query);
  const recipesList = await RecipeModel.find(filters)
    .skip((1 - 1) * 12)
    .sort({ _id: -1 })
    .limit(12);

  const total = await RecipeModel.countDocuments(filters);

  return {
    props: {
      recipesList: stringify(recipesList),
      totalRecipes: total,
    },
  };
}
