function Button({ children, className }) {
  return (
    <button
      className={`${className} flex justify-center items-center w-36 md:w-[180px] h-12 md:h-[60px] bg-black text-white rounded-2xl hover:scale-105  hover:font-semibold transition-all`}
    >
      {children}
    </button>
  );
}

export default Button;
