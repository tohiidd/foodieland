import { useEffect, useRef, useState, Dispatch, SetStateAction, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useBreakpoint } from "hooks/useBreakpoints";
interface Props {
  name: string;
  route: string;
  icon: JSX.Element;
  options: any[];
  setAsideOpen: Dispatch<SetStateAction<boolean>>;
}
function AsideItem({ name, route, icon, options, setAsideOpen }: Props) {
  const [opened, setOpened] = useState(false);
  const [height, setHeight] = useState<string>("0px");

  const contentElement = useRef<HTMLUListElement>(null);

  const router = useRouter();
  const { isLg } = useBreakpoint("lg");

  const accordionToggler = () => {
    if (!route) {
      setOpened(!opened);
      setHeight(!opened ? `${contentElement?.current?.scrollHeight}px` : "0px");
    } else {
      const path = route === "/" ? "/" : `/panel/${route}`;
      router.push(path);
      if (!isLg) {
        setAsideOpen(false);
      }
    }
  };

  useLayoutEffect(() => {
    if (router.pathname.includes(name)) {
      setOpened(true);
      setHeight(`${contentElement?.current?.scrollHeight}px`);
    }
  }, [router, name]);

  return (
    <div className="  text-sm">
      <li
        onClick={accordionToggler}
        className={`${options.length !== 0 ? "cursor-default" : "cursor-pointer"} ${
          router.pathname.includes(name) && route ? "text-blue-500" : ""
        } flex gap-3 px-4 py-3 items-center hover:text-blue-500 transition-all capitalize`}
      >
        <span>{icon}</span>
        <span>{name}</span>
        {options.length !== 0 && <span className="ml-auto">{opened ? <FiChevronUp /> : <FiChevronDown />}</span>}
      </li>
      <ul
        ref={contentElement}
        style={{ height }}
        className="overflow-hidden transition-all duration-200 pl-7 bg-lightGray"
      >
        {options.map(({ id, name, route }) => (
          <Link href={`/panel/${route}`} key={id}>
            <li
              className={`${
                router.pathname.includes(`/panel/${route}`) ? "text-blue-500" : ""
              } p-3 cursor-pointer hover:text-blue-500 transition-all capitalize`}
              onClick={() => !isLg && setAsideOpen(false)}
            >
              {name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default AsideItem;
