import Footer from "../UI/Footer";
import Navbar from "../UI/navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
