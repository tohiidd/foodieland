import { IUi } from "../../services/types";

function Container({ children, className }: IUi) {
  return (
    <section
      className={`${className} font-inter container mx-auto 2xl:max-w-7xl px-1`}
    >
      {children}
    </section>
  );
}

export default Container;
