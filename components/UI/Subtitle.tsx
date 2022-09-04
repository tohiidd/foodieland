import { IUi } from "../../services/types";

function Subtitle({ children, className }: IUi) {
  return (
    <p
      className={`font-inter font-normal text-center text-secondary text-sm md:text-base ${className} `}
    >
      {children}
    </p>
  );
}

export default Subtitle;
