function Button({ children, className, ...restProps }: any) {
  return (
    <button
      className={`${className} flex justify-center items-center bg-black text-white rounded-2xl text-xs md:text-base `}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Button;
