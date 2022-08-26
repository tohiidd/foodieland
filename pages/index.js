import Categories from "../components/Categories/Categories";
import BlueRecipe from "../components/Recipe/BlueRecipe";
import HeaderSlider from "../components/Slider/HeaderSlider";
import Container from "../components/UI/Container";
import Subtitle from "../components/UI/Subtitle";
import Title from "../components/UI/Title";
import { recipes } from "../services/data/recipeData";

function HomePage() {
  return (
    <div>
      <HeaderSlider />
      <Categories />
      <Container>
        <div className="flex flex-col justify-center items-center">
          <Title className="mb-[24px] ">Simple and tasty recipes</Title>
          <Subtitle className="mb-[96px] sm:mb-[80px] ">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqut enim ad minim
          </Subtitle>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-10">
          {recipes.slice(0, 8).map(({ title, img, category, id }) => (
            <BlueRecipe
              key={id}
              id={id}
              title={title}
              img={img}
              category={category}
            />
          ))}
        </div>
      </Container>
      <Container>
        <div className="my-8 px-4 xl:px-0 flex flex-col items-center justify-between xl:flex-row xl:text-left lg:flex-col lg:text-center md:flex-col text-center sm:flex-col">
          <Title className=" xl:text-left xl:w-[567px] md:w-11/12 w-full md:mb-2 xl:mb-0">
            Try this delicious recipe to make your day
          </Title>
          <Subtitle className="xl:text-left xl:w-[620px] lg:w-full w-[90%]">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqut enim ad minim
          </Subtitle>
        </div>
      </Container>
    </div>
  );
}
export default HomePage;
