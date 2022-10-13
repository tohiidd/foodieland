import { IUi } from "../../types";

function Button({ children, className }: IUi) {
  return (
    <button
      className={`${className} flex justify-center items-center bg-black text-white rounded-2xl text-xs md:text-base `}
    >
      {children}
    </button>
  );
}

export default Button;
