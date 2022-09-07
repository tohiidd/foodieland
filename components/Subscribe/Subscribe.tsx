import Image from "next/image";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Subtitle from "../UI/Subtitle";
import Title from "../UI/Title";

function Subscribe() {
  return (
    <Container className="mt-20 sm:mt-30">
      <div className=" w-full  mx-auto overflow-hidden rounded-[60px] text-center bg-[#E7F9FD] my-10">
        <div className="text-black flex flex-col items-center">
          <div className="w-11/12 sm:w-[589px] sm:tracking-[-0.04em] mb-3 ">
            <Title className="text-3xl mt-5 sm:mt-10 lg:mt-20 mb-3 md:mb-6 sm:leading-[58px] ">
              Deliciousness to your inbox
            </Title>
          </div>
          <div className="w-11/12 md:w-[620px]  text-center font-normal text-secondary text-sm md:text-base">
            <Subtitle className="sm:leading-[28px]">
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad
              minim
            </Subtitle>
          </div>
        </div>
        <div className="  flex justify-between items-center relative">
          <form className="flex justify-center items-center w-11/12 sm:w-[480px]  sm:h-20 relative my-10 sm:mt-16 sm:mb-20 mx-auto rounded-3xl	bg-white">
            <input
              type="email"
              name="email"
              placeholder="Your Email Address ..."
              className="placeholder:text-sm md:placeholder:text-base w-full h-full pl-4 sm:pl-8 py-4 sm:py-8 rounded-2xl text-[17px] tracking-[-0.02em] leading-[17px] text-[rgba(0,0,0,0.4)]"
            />
            <Button className="w-28 sm:w-40 h-[45px] sm:h-[60px]  absolute top-auto right-0 my-1 sm:my-2.5 mr-2.5 ">
              subscribe
            </Button>
          </form>
          <div className="absolute bottom-0 -left-16 lg:left-0 hidden md:block md:w-[225px] md:h-[225px] lg:w-[300px] lg:h-[300px] xl:w-[380px] xl:h-[380px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/others%2Fkisspng-salad-salad-fresh-food-healthylife-vegetables-vegetarian-5d42e3a7cb8543%201.png?alt=media&token=97d88f43-d0fc-4e4a-b73d-405d6e95cbf0"
              alt="salad"
              layout="fill"
            />
          </div>
          <div className="absolute bottom-0 right-0 hidden md:block  ml-auto md:w-[170px] md:h-[160px] lg:w-[210px] lg:h-[190px] xl:w-[260px] xl:h-[240px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/others%2FPhoto-plate.png?alt=media&token=bf5388cb-6505-4804-9552-881847b6bae7"
              alt="plate"
              layout="fill"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Subscribe;
