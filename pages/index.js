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
          <Title className="mb-[24px]"> Simple and tasty recipes</Title>
          <Subtitle className="mb-[96px] sm:mb-[80px]">
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
    </div>
  );
}
export default HomePage;
