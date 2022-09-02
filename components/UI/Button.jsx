function Button({ children, className }) {
  return (
    <button
      className={`${className} flex justify-center items-center bg-black text-white rounded-2xl text-xs md:text-base `}
    >
      {children}
    </button>
  );
}

export default Button;
