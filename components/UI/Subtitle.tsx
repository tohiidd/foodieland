import { IUi } from "../../services/types";

function Subtitle({ children, className }: IUi) {
  return (
    <h6
      className={`font-inter font-normal text-center text-secondary text-sm md:text-base ${className} `}
    >
      {children}
    </h6>
  );
}

export default Subtitle;
