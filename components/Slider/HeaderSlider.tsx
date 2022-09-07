import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { recipes } from "../../services/data/recipeData";
import SliderItem from "./SliderItem";
import Container from "../UI/Container";
import { icons } from "../../services/utils/icons";
import classes from "./slider.module.css";

function HeaderSlider() {
  const sliderData = recipes.filter((recipe) => recipe.banner !== "");
  return (
    <Container className="relative my-12">
      <div
        className={`swiper-button-prev bg-[#FFFFFF99] py-6 px-3 rounded-[50%] after:hidden ${classes.arrow}`}
      >
        {icons.arrowLeft()}
      </div>
      <div
        className={`swiper-button-next bg-[#FFFFFF99] py-6 px-3 rounded-[50%] after:hidden ${classes.arrow}`}
      >
        {icons.arrowRight()}
      </div>
      <Swiper
        spaceBetween={30}
        loop={true}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
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
              cookTime={recipe.cookTime}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default HeaderSlider;
