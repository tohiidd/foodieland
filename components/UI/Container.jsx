function Container({ children, className }) {
  return (
    <div className={`${className} container mx-auto 2xl:max-w-7xl`}>
      {children}
    </div>
  );
}

export default Container;
