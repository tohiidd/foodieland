import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { recipes } from "../../data/recipe";
import SliderItem from "./SliderItem";
import Container from "../UI/Container";
import { icons } from "../../utils/icons";

function HeaderSlider() {
  const sliderData = recipes.filter((recipe) => recipe.banner !== "");
  return (
    <Container className="relative my-12">
      <div className="swiper-button-prev bg-[#FFFFFF99] py-5 lg:py-7 px-3 rounded-[50%] after:hidden child:fill-[#00000099]  child:w-5 lg:child:w-7 !w-auto">
        {icons.arrowLeft()}
      </div>
      <div className="swiper-button-next bg-[#FFFFFF99] py-5 lg:py-7 px-3 rounded-[50%] after:hidden child:fill-[#00000099] child:w-5 lg:child:w-7 !w-auto">
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
              createdAt={recipe.createdAt}
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
