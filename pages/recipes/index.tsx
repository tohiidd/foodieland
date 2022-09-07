import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Recipe from "../../components/Recipe/Recipe";
import SearchBar from "../../components/SearchBar/SearchBar";
import Subscribe from "../../components/Subscribe/Subscribe";
import Container from "../../components/UI/Container";
import Title from "../../components/UI/Title";
import { categoriesData } from "../../services/data/categoriesData";
import { recipes as recipeList } from "../../services/data/recipeData";

function Recipes() {
  const [recipes, setRecipes] = useState(recipeList);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);

  let indexOfLastRecipe = currentPage * recipesPerPage;
  let indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const router = useRouter();
  let currentQuery = router.query.category as string;
  let filteredRecipes = recipes;
  if (currentQuery) {
    filteredRecipes = recipes.filter((recipe) =>
      currentQuery.includes(recipe.category)
    );
  }

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let keyword = event?.target.value;
    let data = recipeList.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLocaleLowerCase())
    );
    setRecipes(data);
  };

  const selectCategoryHandler = (name: string) => () => {
    let queryLength = currentQuery?.split("/").length;

    if (currentQuery?.includes(name) && queryLength === 2) {
      delete router.query.category;
      router.push(router);
    } else if (currentQuery?.includes(name) && queryLength !== 2) {
      router.push({
        pathname: "/recipes",
        query: {
          category: currentQuery?.replace(`/${name}`, ""),
        },
      });
    } else {
      router.push({
        pathname: "/recipes",
        query: {
          category: `${currentQuery ? `${currentQuery}` : ""}/${name}`,
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
      <SearchBar
        searchHandler={searchHandler}
        placeholder={"search for recipes"}
      />
      <div>
        <ul className="flex w-full justify-center gap-4 md:gap-8 flex-wrap mb-6 ">
          {categoriesData.map(({ id, name }) => (
            <li
              key={id}
              className={`${
                currentQuery?.includes(name)
                  ? "bg-blue-100 border-blue-700 text-blue-700 "
                  : ""
              } gap-2 border border-gray-500 text-gray-500 cursor-pointer rounded-3xl py-2 px-4 my-1 md:my-3 transition-all hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 `}
              onClick={selectCategoryHandler(name)}
            >
              <div className="capitalize">{name}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className=" flex gap-6 justify-center  mx-auto   flex-wrap min-h-[600px]">
        {filteredRecipes
          .slice(indexOfFirstRecipe, indexOfLastRecipe)
          .map(({ img, title, category, id, cookTime }) => (
            <Recipe
              key={id}
              id={id}
              img={img}
              title={title}
              category={category}
              cookTime={cookTime}
            />
          ))}
      </div>
      <div className="w-auto">
        {filteredRecipes.length / recipesPerPage > 1 && (
          <Pagination
            postPerPage={recipesPerPage}
            totalPosts={filteredRecipes.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      <Subscribe />
    </Container>
  );
}

export default Recipes;
