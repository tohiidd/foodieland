import { IUi } from "../../services/types";

function Container({ children, className }: IUi) {
  return (
    <section className={`${className}  container mx-auto 2xl:max-w-7xl`}>
      {children}
    </section>
  );
}

export default Container;
