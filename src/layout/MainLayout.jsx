import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import ScrollToTop from "../component/scrolltoTop/ScrollToTop";
import { Outlet } from "react-router-dom";
import ChatBot from "../component/chat/Chatbot";

function MainLayout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
      <ChatBot/>
      <Footer />
    </>
  );
}

export default MainLayout;