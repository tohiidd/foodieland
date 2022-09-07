import Categories from "../components/Categories/Categories";
import Cooker from "../components/Cooker/Cooker";
import Instagram from "../components/Instagram/Instagram";
import BlueRecipe from "../components/Recipe/BlueRecipe";
import Recipe from "../components/Recipe/Recipe";
import HeaderSlider from "../components/Slider/HeaderSlider";
import Subscribe from "../components/Subscribe/Subscribe";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Subtitle from "../components/UI/Subtitle";
import Title from "../components/UI/Title";
import { instagramItems } from "../services/data/instagramData";
import { recipes } from "../services/data/recipeData";
import { icons } from "../services/utils/icons";

function HomePage() {
  return (
    <section>
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
        <div className="flex flex-row flex-wrap justify-center gap-6 md:gap-10">
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
      <Cooker />

      <section className="mt-20 sm:mt-40 bg-gradient-blueSky">
        <Container>
          <div className="text-center">
            <Title className="mb-5 md:mb-10">
              Check out @foodieland on Instagram
            </Title>
            <Subtitle className="md:w-4/5 mx-auto">
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad
              minim
            </Subtitle>
          </div>
          <div className="flex flex-wrap gap-5 xl:gap-8 mt-10 md:mt-16 justify-center  mx-auto">
            {instagramItems.map(({ id, imageUrl, caption, date }) => (
              <Instagram
                key={id}
                imageUrl={imageUrl}
                caption={caption}
                date={date}
              />
            ))}
          </div>
          <div className="mt-16 pb-20">
            <Button className="  py-4 md:py-5 px-4 md:px-6 mx-auto ">
              <span>Visit Our Instagram</span>
              <span className="ml-4">{icons.whiteInstagram()}</span>
            </Button>
          </div>
        </Container>
      </section>
      <Container className="mt-20 md:mt-40">
        <div className="my-8 px-4 xl:px-0 flex flex-col items-center justify-between xl:flex-row xl:text-left lg:flex-col lg:text-center md:flex-col text-center sm:flex-col">
          <Title className=" xl:text-left xl:w-[567px] md:w-11/12 w-full md:mb-2 xl:mb-0">
            Try this delicious recipe to make your day
          </Title>
          <Subtitle className="xl:text-left xl:w-[620px] lg:w-full w-[90%]">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqut enim ad minim
          </Subtitle>
        </div>
        <div className="flex gap-4 sm:gap-6 justify-center mx-auto xl:justify-between items-center sm:w-full flex-wrap">
          {recipes
            .slice(8, 16)
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
      </Container>
      <Subscribe />
    </section>
  );
}
export default HomePage;