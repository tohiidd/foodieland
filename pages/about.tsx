import Image from "next/image";
import Subscribe from "../components/Subscribe/Subscribe";
import Container from "../components/UI/Container";
import Subtitle from "../components/UI/Subtitle";
import Title from "../components/UI/Title";
import { chefsData } from "../services/data";

function AboutPage() {
  return (
    <Container>
      <div className="flex flex-wrap gap-10 my-20">
        <div className="basis-[100%] lg:basis-[49%] flex flex-col justify-between">
          <div>
            <Title className="lg:text-4xl xl:text-5xl  text-center lg:text-left">
              23 Years Of Experience In Cooking Services
            </Title>
          </div>
          <div className="mt-6 block lg:hidden basis[100%] lg:basis-[46%] mx-auto">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/others%2Four-experience.jpg?alt=media&token=74cd67db-988c-4e05-8926-994d65a7e277"
              alt="experience-img"
              width={735}
              height={490}
              className="rounded-xl object-cover h-full mx-auto"
            />
          </div>
          <div>
            <Subtitle className=" my-12 xl:text-lg lg:text-justify">
              Sed ut perspiciatis unde omnis natus error lutatem accusantium
              doloremque laudantium totam rem apam eaquepsa quae abillo
              inventore veritatis quasi arctecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsamya voluptatem quia voluptas sit
              aspernatur aut odifugi sed quia consequuntur magni dolores eos qui
              ratioluptatem sequi nesciunt. Neque porro quisquam est qui dolorem
              ipsum quia dolor sit amet consectetur
            </Subtitle>
          </div>
          <div className="text-center lg:text-left">
            <button className="mx-auto bg-lameBlue font-semibold px-6 py-5 md:px-11 md:py-6 rounded-2xl cursor-pointer hover:bg-darkBlue transition-all">
              DISCOVER MORE
            </button>
          </div>
        </div>
        <div className="hidden lg:block basis[100%] lg:basis-[46%] mx-auto relative">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/others%2Four-experience.jpg?alt=media&token=74cd67db-988c-4e05-8926-994d65a7e277"
            alt="experience-img"
            width={"100%"}
            height={"100%"}
            layout="fill"
            objectFit="cover"
            className="rounded-xl object-cover h-full mx-auto"
          />
        </div>
      </div>
      <div className="font-inter my-28">
        <div className="my-16">
          <Title className="lg:text-left lg:text-4xl xl:text-5xl">
            Our Professional Chefs
          </Title>
        </div>
        <div className="flex flex-wrap justify-center md:justify-between gap-16  lg:gap-20">
          {chefsData.map(({ id, name, role, imageUrl }) => (
            <div className=" basis-[35%] md:basis-[18%] text-center" key={id}>
              <Image
                src={`${imageUrl}`}
                alt="chef-img"
                width={178}
                height={208}
                className="rounded-[50%]"
              />
              <div className="text-center mt-6">
                <h4 className="font-semibold text-lg lg:text-xl">{name}</h4>
                <h6 className="font-semibold text-secondary mt-2">{role}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Subscribe />
    </Container>
  );
}

export default AboutPage;
