import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import ScrollToTop from "../component/scrolltoTop/ScrollToTop";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;