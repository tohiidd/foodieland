import Link from "next/link";
import Image from "next/image";
import { icons } from "../../utils/icons";
import { useState } from "react";
interface Props {
  title: string;
  image: string;
  category: string;
  id: string;
}
function BlueRecipe({ title, image, category, id }: Props) {
  const [like, setLike] = useState(true);
  return (
    <div
      className="  basis-full sm:max-w-[400px] sm:basis-[48%] md:basis-[45%] lg:basis-[40%] xl:basis-[30%] 2xl:basis-[28%] flex flex-col justify-start items-center
    bg-gradient-to-b from-white to-blue-50 rounded-3xl p-[16px] font-inter relative"
    >
      <Link href={`/recipes/${id}`}>
        <div className="w-[100%] h-[250px] xs:h-[340px] sm:w-full sm:h-[220px] cursor-pointer  md:h-[240px] lg:h-[260px] hover:scale-105 transition-all relative mb-6">
          <Image className="rounded-3xl " src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
      </Link>
      <div className="w-[48px] h-[48px] bg-white rounded-full flex justify-center items-center absolute top-[32px] right-[36px]">
        <span onClick={() => setLike((prev) => !prev)} className="w-[20.25px] h-[18px]">
          {like ? icons.whiteHeat() : icons.redHeat()}
        </span>
      </div>
      <Link href={`/recipes/${id}`}>
        <a className="font-semibold text-xl md:text-2xl mb-6 w-full">{title}</a>
      </Link>
      <div className="flex justify-start w-full">
        <div className="flex flex-row-reverse pr-7">
          <p className="font-medium text-sm">30 Minutes</p>
          <span className="w-[18px] h-[18px] mr-3">{icons.timer()}</span>
        </div>
        <div className="flex flex-row-reverse">
          <p className="font-medium text-sm">{category}</p>
          <span className="w-[18px] h-[18px] flex flex-row mr-3">
            {icons.fork()}
            {icons.knife()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlueRecipe;
