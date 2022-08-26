function Title({ children, className }) {
  return (
    <h2
      className={`font-inter font-semibold text-center text-4xl lg:text-5xl ${className} `}
    >
      {children}
    </h2>
  );
}

export default Title;
