import { useEffect, PropsWithChildren, useState } from "react";
import Image from "next/image";
import { useBreakpoint } from "hooks/useBreakpoints";
import Aside from "../Panel/Aside/Aside";

function PanelLayout({ children }: PropsWithChildren) {
  const [asideOpen, setAsideOpen] = useState(false);

  const { isLg } = useBreakpoint("lg");

  const drawerToggler = () => {
    setAsideOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isLg) {
      setAsideOpen(true);
    }
  }, []);

  return (
    <section className="bg-[#f0f0fa] font-inter">
      <aside
        className={`${
          asideOpen ? "w-60 lg:w-1/5" : "w-0"
        } fixed h-screen z-30 transition-all duration-200 overflow-hidden bg-white shadow-sidebar`}
      >
        <Aside setAsideOpen={setAsideOpen} />
      </aside>
      <div
        className={`${
          asideOpen ? "w-full lg:w-0 opacity-20 lg:opacity-0 z-20" : "-z-10 opacity-0"
        }  absolute h-screen transition-all duration-200   right-0 bg-black`}
        onClick={() => setAsideOpen(false)}
      ></div>
      <main
        className={`${asideOpen ? "w-full lg:w-4/5" : "w-full"} z-10 transition-all duration-200 ml-auto min-h-screen`}
      >
        <div className="flex items-center py-[8.5px] px-6 bg-white justify-between ">
          <div className={`${asideOpen ? "" : "child:w-5"} cursor-pointer group `} onClick={drawerToggler}>
            <span className="h-0.5 w-5 block mb-1 bg-blue-500 transition-all duration-300 group-hover:w-5"> </span>
            <span className="h-0.5 w-3.5 block mb-1 bg-blue-500 transition-all duration-300 group-hover:w-5"> </span>
            <span className="h-0.5 w-2.5 block mb-1 bg-blue-500 transition-all duration-300 group-hover:w-5"> </span>
          </div>
          <div>
            <Image
              src="https://res.cloudinary.com/dmgb7kvmn/image/upload/v1666085628/foodieland/x99dom3x9nvvbi1btbto.png"
              alt="admin avatar"
              width={40}
              height={40}
            />
          </div>
        </div>
        {children}
      </main>
    </section>
  );
}

export default PanelLayout;
