import Image from "next/image";

interface Props {
  id: number;
  image: string;
  name: string;
  bgColor: string;
}

function Category({ id, image, name, bgColor }: Props) {
  return (
    <div
      className={`basis-[28%] sm:basis-[24%] md:basis-[14%] lg:basis-[14%] h-[130px]  sm:h-[180px] xl:h-[200px] ${bgColor} transition-all hover:scale-110 cursor-pointer category-bg rounded-3xl overflow-hidden my-4 `}
    >
      <div className="mx-auto w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]  lg:w-[80px] xl:w-[100px] relative">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className={` transition-all  text-center font-semibold text-base sm:text-lg py-6 sm:py-11 `}>
        <span className="capitalize">{name}</span>
      </div>
    </div>
  );
}

export default Category;
