import AboutUs from "../components/aboutUs/AboutUs";
import Blog1111 from "../components/blog/Blog1111";
import ContactUs from "../components/contactUs/ContactUs";
import Hero from "../components/hero/Hero";
import OurMission from "../components/ourMission/OurMission";
import Services from "../components/services/Services";
import SocialMedia from "../components/socialMedia/SocialMedia";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";
import AviVideo from "../components/aviVideoSection/AviVideo";

const LandPage = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [mainData, setMainData] = useState();
  const [blogData, setBlogData] = useState();
  const [servicesData, setServicesData] = useState();

  async function fecthMainData() {
    await axios
      .get("https://example.com", {
        headers: {
          "X-localization": i18n.language,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.mainData;
          setMainData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  async function fecthServicesData() {
    await axios
      .get("https://example.com", {
        headers: {
          "X-localization": i18n.language,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setServicesData(data);
          setLoading3(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  async function fecthBlogData() {
    await axios
      .get("https://example.com")
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setBlogData(data);
          setLoading2(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  useEffect(() => {
    AOS.init();
    fecthMainData();
    fecthServicesData();
    fecthBlogData();
  }, []);
  document.body.dir = i18n.dir();
  return loading ? (
    <Loading />
  ) : loading2 ? (
    <Loading />
  ) : loading3 ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>Averroes</title>
      </Helmet>
      <Header />
      <Hero
        counter1={{
          name_ar: mainData[1].first_counter_name,
          name_en: mainData[0].first_counter_name,
          value: mainData[0].first_counter_value,
        }}
        counter2={{
          name_ar: mainData[1].second_counter_name,
          name_en: mainData[0].second_counter_name,
          value: mainData[0].second_counter_value,
        }}
      />
      <AviVideo />
      <AboutUs
        mainContent_ar={mainData[1].about_us}
        mainContent_en={mainData[0].about_us}
      />
      <OurMission
        mainContent_ar={mainData[1].our_mission}
        mainContent_en={mainData[0].our_mission}
      />
      <SocialMedia />
      <Services servicesData={servicesData} />
      <Blog1111 blogData={blogData} />
      <ContactUs />
      <Footer />
    </>
  );
};

export default LandPage;
