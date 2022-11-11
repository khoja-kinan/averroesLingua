import ContactUs from "../components/contactUs/ContactUs";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Aos from "aos";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ContactUsPage = () => {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  useEffect(() => {
    Aos.init();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <ContactUs />
      <Footer />
    </>
  );
};

export default ContactUsPage;
