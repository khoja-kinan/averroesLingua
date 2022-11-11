import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Box from "@mui/material/Box";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Aos from "aos";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading/Loading";
import LazyLoad from "react-lazy-load";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const ServicePage = () => {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const imageUrl = "hhttps://example.com";
  const { servicetSlug } = useParams();
  const URL = `https://example.com`;
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState();

  async function fecthData() {
    await axios
      .get(URL)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.service;
          setServiceData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        //console.log(error.response);
      });
  }
  useEffect(() => {
    Aos.init();
    window.scrollTo(0, 0);

    fecthData();
  }, []);
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  return loading ? (
    <Loading />
  ) : (
    <>
      <Box>
        <Header />
      </Box>
      <Box
        data-aos="zoom-in-up"
        data-aos-duration="1500"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gridAutoColumns: "1fr",
          background:
            "linear-gradient(180deg, #FFFBF4 0%, rgba(255, 251, 244, 0.984375) 1.56%, #FFFFFF 100%)",
        }}
      >
        <Box
          data-aos="zoom-in-up"
          data-aos-duration="1500"
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            gridAutoColumns: "1fr",
            padding: "1rem 0 ",
            borderBottom: "1px solid rgba(60, 74, 83, 0.44)",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              gridColumnStart: "1",
              gridColumnEnd: "3",
            }}
          >
            <LazyLoad offsetTop={200}>
              <img
                src={`${imageUrl}${serviceData[0].image}`}
                alt={serviceData[0].image}
                style={{ width: "100%" }}
              />
            </LazyLoad>
          </Box>
          <Box
            sx={{
              gridColumnStart: "3",
              gridColumnEnd: "13",
            }}
          >
            <Typography
              className="SingleServicesMobile"
              variant="h4"
              sx={{ color: "#3C4A53" }}
            >
              {i18n.dir() === "ltr"
                ? serviceData[0].tittle_en
                : serviceData[0].tittle_ar}
              <span
                style={{
                  marginLeft: "3px",
                  height: "8px",
                  width: "8px",
                  backgroundColor: "#E87B5A",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
            </Typography>
          </Box>
          <Box
            sx={{
              gridRowtart: "2",
              gridColumnStart: "1",
              gridColumnEnd: "12",
              color: "rgba(60, 74, 83, 0.47)",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "rgba(60, 74, 83, 0.47)",
              }}
            >
              {i18n.dir() === "ltr" ? "Home" : "الرئيسية"}{" "}
            </Link>
            {i18n.dir() === "ltr" ? (
              <ArrowForwardIosIcon fontSize="small" />
            ) : (
              <ArrowBackIosIcon fontSize="small" />
            )}{" "}
            <HashLink
              smooth
              to="/#services"
              scroll={(el) => scrollWithOffset(el)}
              style={{
                textDecoration: "none",
                color: "rgba(60, 74, 83, 0.47)",
              }}
            >
              {i18n.dir() === "ltr" ? "Services" : "الخدمات"}
            </HashLink>
            {i18n.dir() === "ltr" ? (
              <ArrowForwardIosIcon fontSize="small" />
            ) : (
              <ArrowBackIosIcon fontSize="small" />
            )}{" "}
            {i18n.dir() === "ltr"
              ? serviceData[0].tittle_en
              : serviceData[0].tittle_ar}
          </Box>
        </Box>
        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            gridAutoColumns: "1fr",
            margin: "1rem 0",
          }}
        >
          <Typography sx={{ gridColumnStart: "1", gridColumnEnd: "12" }}>
            {i18n.dir() === "ltr"
              ? serviceData[0].description_en
              : serviceData[0].description_ar}
          </Typography>
        </Box>

        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "grid",
            gridTemplateColumns: "repeat(8,1fr)",
            gridAutoColumns: "1fr",
            margin: "1rem 0",
          }}
          className="singleServiceContainerMobile"
        >
          <Card
            sx={{
              gridColumnStart: "1",
              gridColumnEnd: "3",
              boxShadow: "0px 2px 10px rgb(0 0 0 / 25%)",
              filter: "drop-shadow(0px 50px 80px rgba(255, 238, 232, 0.58))",
              borderRadius: "40px",
              height: "100%",
            }}
            className="cardHover serviceCardMobile"
          >
            <CardActionArea sx={{ height: "100%" }} className="cardActionArea">
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  width: "100%",
                  padding: "1rem",
                }}
              >
                <LazyLoad offsetTop={200}>
                  <img
                    src={`${imageUrl}${serviceData[0].subservice.first_sub_ico}`}
                    alt={serviceData[0].subservice.first_sub_tittle_en}
                    style={{
                      margin: "0 auto",
                      width: "50%",
                    }}
                    className="singleServiceImage"
                  />
                </LazyLoad>
              </Box>
              <CardContent
                sx={{
                  height: "100%",
                  backgroundColor: "rgba(232, 123, 90, 0.2)",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderTopLeftRadius: "53px 53px",
                  borderTopRightRadius: "53px 53px",
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "1.2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#E87B5A",
                    marginBottom: "1rem",
                  }}
                >
                  {i18n.dir() === "ltr"
                    ? serviceData[0].subservice.first_sub_tittle_en
                    : serviceData[0].subservice.first_sub_tittle_ar}
                </Typography>
                <Typography
                  gutterBottom
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "0.9rem",
                    marginBottom: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {i18n.dir() === "ltr"
                    ? serviceData[0].subservice.first_sub_bio_en
                    : serviceData[0].subservice.first_sub_bio_ar}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              gridColumnStart: "4",
              gridColumnEnd: "6",
              boxShadow: "0px 2px 10px rgb(0 0 0 / 25%)",
              filter: "drop-shadow(0px 50px 80px rgba(255, 238, 232, 0.58))",
              borderRadius: "40px",
              height: "100%",
            }}
            className="cardHover serviceCardMobile"
          >
            <CardActionArea sx={{ height: "100%" }} className="cardActionArea">
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  width: "100%",
                  padding: "1rem",
                }}
              >
                <LazyLoad offsetTop={200}>
                  <img
                    src={`${imageUrl}${serviceData[0].subservice.second_sub_ico}`}
                    alt={serviceData[0].subservice.second_sub_tittle_en}
                    style={{
                      margin: "0 auto",
                      width: "45%",
                    }}
                    className="singleServiceImage"
                  />
                </LazyLoad>
              </Box>
              <CardContent
                sx={{
                  height: "100%",
                  backgroundColor: "rgba(232, 123, 90, 0.2)",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderTopLeftRadius: "53px 53px",
                  borderTopRightRadius: "53px 53px",
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "1.2rem",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#E87B5A",
                    marginBottom: "1rem",
                  }}
                >
                  {i18n.dir() === "ltr"
                    ? serviceData[0].subservice.second_sub_tittle_en
                    : serviceData[0].subservice.second_sub_tittle_ar}
                </Typography>
                <Typography
                  gutterBottom
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "0.9rem",
                    marginBottom: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {i18n.dir() === "ltr"
                    ? serviceData[0].subservice.second_sub_bio_en
                    : serviceData[0].subservice.second_sub_bio_ar}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              gridColumnStart: "7",
              gridColumnEnd: "9",
              boxShadow: "0px 2px 10px rgb(0 0 0 / 25%)",
              filter: "drop-shadow(0px 50px 80px rgba(255, 238, 232, 0.58))",
              borderRadius: "40px",
              height: "100%",
            }}
            className="cardHover serviceCardMobile"
          >
            <CardActionArea sx={{ height: "100%" }} className="cardActionArea">
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  width: "100%",
                  padding: "1rem",
                }}
              >
                <LazyLoad offsetTop={200}>
                  <img
                    src={`${imageUrl}${serviceData[0].subservice.third_sub_ico}`}
                    alt={serviceData[0].subservice.third_sub_tittle_en}
                    style={{
                      margin: "0 auto",
                      width: "50%",
                    }}
                    className="singleServiceImage"
                  />
                </LazyLoad>
              </Box>
              <CardContent
                sx={{
                  height: "100%",
                  backgroundColor: "rgba(232, 123, 90, 0.2)",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderTopLeftRadius: "53px 53px",
                  borderTopRightRadius: "53px 53px",
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "1.2rem",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#E87B5A",
                    marginBottom: "1rem",
                  }}
                >
                  {i18n.dir() === "ltr"
                    ? serviceData[0].subservice.third_sub_tittle_en
                    : serviceData[0].subservice.third_sub_tittle_ar}
                </Typography>
                <Typography
                  gutterBottom
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "0.9rem",
                    marginBottom: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {i18n.dir() === "ltr"
                    ? serviceData[0].subservice.third_sub_bio_en
                    : serviceData[0].subservice.third_sub_bio_ar}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Box
            sx={{
              gridColumnStart: "4",
              gridColumnEnd: "6",
              justifySelf: "center",
              alignSelf: "center",
              marginTop: "3rem",
            }}
          >
            <Link
              to="/contact-us"
              style={{
                padding: "15px 20px",
                backgroundColor: "#E87B5A",
                color: "#FFFEFD",
                fontSize: "18px",
                boxShadow:
                  "0px 12px 24px 6px rgba(253, 89, 86, 0.08), 0px 24px 48px 6px rgba(253, 89, 86, 0.08)",
                textDecoration: "none",
                borderRadius: "18px",
              }}
            >
              {i18n.dir() === "ltr" ? "Contact US" : "تواصلوا معنا"}
            </Link>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: "2rem",
          position: "relative",
          width: "100%",
        }}
        className="FooterBoxServicePage"
      >
        <Footer />
      </Box>
    </>
  );
};

export default ServicePage;
