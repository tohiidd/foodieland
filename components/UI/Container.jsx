function Container({ children, className }) {
  return (
    <section className={`${className} container mx-auto 2xl:max-w-7xl px-2`}>
      {children}
    </section>
  );
}

export default Container;
