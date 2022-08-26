function Subtitle({ children, className }) {
  return (
    <p
      className={`font-inter font-normal text-center text-secondary text-sm md:text-base ${className} `}
    >
      {children}
    </p>
  );
}

export default Subtitle;
