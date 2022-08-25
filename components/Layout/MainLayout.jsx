import Footer from "../UI/Footer";
import Navbar from "../UI/navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
