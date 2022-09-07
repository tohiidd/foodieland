import { ChangeEvent, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Recipe from "../../components/Recipe/Recipe";
import SearchBar from "../../components/SearchBar/SearchBar";
import Subscribe from "../../components/Subscribe/Subscribe";
import Container from "../../components/UI/Container";
import Title from "../../components/UI/Title";
import { recipes as recipesData } from "../../services/data/recipeData";

function Recipes() {
  const [recipes, setRecipes] = useState(recipesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let keyword = event?.target.value;
    let data = recipes.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLocaleLowerCase())
    );
    setRecipes(data);
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
        {/* <div className="basis-[20%]"> */}
        {/* <div className="flex flex-col items-center lg:items-start justify-between cursor-pointer "> */}

        {/* <ul className="flex flex-row lg:flex-col w-3/5 md:w-full justify-center items-start gap-4 lg:gap-0 flex-wrap  ">
              {categoriesData.map(({ id, name }) => (
                <CategoryFilter
                  key={id}
                  name={name}
                  id={id}
                  checkHandler={checkHandler}
                  checked={categoryChecked[name]}
                />
              ))}
            </ul> */}
        {/* </div> */}
        {/* </div> */}
        <div className=" flex gap-6 justify-center  mx-auto xl:justify-start items-center  flex-wrap min-h-[600px]">
          {currentRecipes.map(({ img, title, category, id, cookTime }) => (
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
      </div>
      <div className="w-auto">
        {recipes.length / recipesPerPage > 1 && (
          <Pagination
            postPerPage={recipesPerPage}
            totalPosts={recipes.length}
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
