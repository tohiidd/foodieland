import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { asideOptions } from "./data";
import AsideItem from "./AsideItem/AsideItem";

interface Props {
  setAsideOpen: Dispatch<SetStateAction<boolean>>;
}
function Aside({ setAsideOpen }: Props) {
  return (
    <div>
      <div className="text-center bg-lightGray py-4">
        <Link href="/">
          <a className="font-bold text-2xl font-lobster ">Foodieland.</a>
        </Link>
      </div>

      <ul>
        {asideOptions.map(({ id, icon, name, route, options }) => (
          <AsideItem key={id} icon={icon} name={name} route={route} options={options} setAsideOpen={setAsideOpen} />
        ))}
      </ul>
    </div>
  );
}

export default Aside;
