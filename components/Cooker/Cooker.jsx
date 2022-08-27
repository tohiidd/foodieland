import Image from "next/image";
import Button from "../UI/Button";
import Container from "../UI/Container";

function Cooker() {
  return (
    <Container className="mt-40">
      <div className="flex lg:justify-between lg:flex-row flex-col justify-center md:items-center">
        <div className="flex flex-col sm:mb-10 md:mb-20 justify-center items-center lg:items-start">
          <h1 className="font-inter font-semibold text-4xl lg:text-4xl xl:text-5xl w-auto lg:w-[450px] xl:w-[526px]  tracking-tighter mb-[24px] text-center lg:text-left">
            Everyone can be a chef in their own kitchen
          </h1>
          <p className="font-inter font-normal text-secondary text-sm md:text-base w-auto lg:w-[400px] xl:w-[500px] mb-[72px] text-center lg:text-left">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqut enim ad minim
          </p>
          <Button>Learn More</Button>
        </div>
        <div className="hidden sm:block w-auto md:w-[651px] h-[600px] lg:h-[500px] xl:h-[600px] bg-gradient-to-b from-white to-blue-50 relative rounded-3xl">
          <div className="absolute  w-full bottom-0  h-[597px] lg:h-[500px] xl:h-[600px] ">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/cooker%2Fimage-220.png?alt=media&token=acdfc1a1-ed68-4828-a969-cf76a35273d6"
              alt="cooker"
              layout="fill"
            />
          </div>
          <div className="absolute w-10 h-10 sm:w-12 sm:h-12 top-80 md:right-[626px] lg:right-[520px] xl:right-[626px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/cooker%2Fimage-27.png?alt=media&token=5d425ed4-1d82-4847-b161-9ee8f44fae54"
              alt="tomato"
              layout="fill"
            />
          </div>
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 top-[70px] right-[36px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/cooker%2Fimage-20.png?alt=media&token=d5b7da00-93d7-4e8e-afff-a695bb88499c"
              alt="lettuce"
              layout="fill"
            />
          </div>
          <div className="absolute h-20 w-20 sm:w-24 sm:h-24 left-10 md:right-[510px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/cooker%2Fimage-21.png?alt=media&token=8f89a387-6bf5-4692-ad85-a0c1cbea37c2"
              alt="meat"
              layout="fill"
            />
          </div>
          <div className="absolute h-11 w-11 md:w-16 md:h-16 right-28 sm:right-36 md:right-[180px] lg:right-[120px] xl:right-[180px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/cooker%2Fimage-28.png?alt=media&token=279beb4f-853c-4977-9835-45b615a38141"
              alt="onion"
              layout="fill"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Cooker;
