import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { recipes } from "../../services/data/recipeData";
import SliderItem from "./SliderItem";
import Container from "../UI/Container";

function HeaderSlider() {
  const sliderData = recipes.filter((recipe) => recipe.banner !== "");
  return (
    <Container className={"my-12"}>
      <Swiper spaceBetween={30} navigation loop={true} modules={[Navigation]}>
        {sliderData.map((recipe) => (
          <SwiperSlide key={recipe.id}>
            <SliderItem
              title={recipe.title}
              id={recipe.id}
              category={recipe.category}
              banner={recipe.banner}
              chef={recipe.chef}
              chefImg={recipe.chefImg}
              date={recipe.date}
              description={recipe.description}
              cookTime={recipe.cook_time}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default HeaderSlider;
