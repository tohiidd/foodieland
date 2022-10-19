import Image from "next/image";
import { icons } from "../../utils/icons";

interface Props {
  image: string;
  caption: string;
  date: string;
}
function Instagram({ image, caption, date }: Props) {
  return (
    <div className="bg-white basis-full xs:basis-[46%]  md:basis-[22%]  pb-8  rounded-md relative">
      <div className="flex justify-between items-center py-1 px-2">
        <div className="flex ">
          <div>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/instagram%2Finstagram-img.png?alt=media&token=5a50cb2e-1acb-4560-9f96-ec4e32e5b5f7"
              alt="instagram-profile"
              width={25}
              height={25}
            />
          </div>
          <div className="flex flex-col ml-2">
            <span className=" font-semibold text-[8px] sm:text-[10px]">Foodieland</span>
            <span className="text-[8px]">tokyo,japan</span>
          </div>
        </div>
        <div>
          <span>{icons.instagramMore()}</span>
        </div>
      </div>
      <div>
        <Image src={image} alt="instagram-food" width={500} height={500} objectFit="cover" />
      </div>
      <div className="flex items-center py-2 px-2 relative">
        <a href="" className="mr-2">
          <span>{icons.instagramLike()}</span>
        </a>
        <a href="" className="mr-2">
          <span>{icons.instagramComment()}</span>
        </a>
        <a href="" className="mr-2">
          <span>{icons.instagramShare()}</span>
        </a>
        <a href="" className="absolute right-2">
          <span>{icons.instagramSave()}</span>
        </a>
      </div>
      <div className="text-[10px] sm:text-xs px-2">
        <span className="font-semibold">Foodieland:</span>
        <span className="text-[10px] lg:text-xs">{caption}</span>
      </div>
      <div className="text-secondary text-[10px] absolute p-2 bottom-1 ">
        <span>{date}</span>
      </div>
    </div>
  );
}

export default Instagram;
