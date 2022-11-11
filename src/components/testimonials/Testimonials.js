import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carousel from "react-bootstrap/Carousel";
import image from "../../assets/testimonials/TesPic.png";
import Ellipse1 from "../../assets/testimonials/Ellipse1.png";
import Ellipse2 from "../../assets/testimonials/Ellipse2.png";
import Ellipse3 from "../../assets/testimonials/Ellipse3.png";
import { useTranslation } from "react-i18next";

const Testimonials = ({ testimonialsData }) => {
  const { t, i18n } = useTranslation();

  return (
    <Box
      id="testimonials"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      sx={{
        marginTop: "10rem",
        marginBottom: "10rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">
        <span
          style={{
            color: "#E87B5A",
          }}
        >
          {t("description.t")}
        </span>
        {t("description.testimonials")}
        <span
          style={{
            margin: "0 3px",
            height: "10px",
            width: "10px",
            backgroundColor: "#E87B5A",
            borderRadius: "50%",
            display: "inline-block",
          }}
        ></span>
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gridAutoColumns: "1fr",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={Ellipse1}
          sx={{
            width: 60,
            height: 60,
            gridColumnStart: "10",
            display: { xs: "none", md: "block" },
          }}
        />
        <Avatar
          alt="Remy Sharp"
          src={Ellipse2}
          sx={{
            width: 50,
            height: 50,
            gridColumnStart: "3",
            gridRowStart: "2",
            alignSelf: "start",
            display: { xs: "none", md: "block" },
          }}
        />
        <Avatar
          alt="Remy Sharp"
          src={Ellipse2}
          sx={{
            width: 40,
            height: 40,
            gridColumnStart: "12",
            gridRowStart: "2",
            alignSelf: "center",
            display: { xs: "none", md: "block" },
          }}
        />
        <Avatar
          alt="Remy Sharp"
          src={Ellipse3}
          sx={{
            width: 70,
            height: 70,
            gridColumnStart: "2",
            gridRowStart: "2",
            alignSelf: "center",
            display: { xs: "none", md: "block" },
          }}
        />
        <Avatar
          alt="Remy Sharp"
          src={Ellipse3}
          sx={{
            width: 50,
            height: 50,
            gridColumnStart: "10",
            gridRowStart: "2",
            alignSelf: "end",
            justifySelf: "end",
            display: { xs: "none", md: "block" },
          }}
        />
        <Avatar
          alt="Remy Sharp"
          src={Ellipse1}
          sx={{
            width: 30,
            height: 30,
            gridColumnStart: "3",
            gridRowStart: "2",
            alignSelf: "end",
            justifySelf: "center",
            display: { xs: "none", md: "block" },
          }}
        />
        <Carousel
          fade
          indicators={false}
          style={{
            gridColumnStart: "4",
            gridColumnEnd: "10",
            gridRowStart: "2",
            boxShadow: "rgb(103 105 108 / 50%) 18px 18px 52.8537px",
            borderRadius: "40px",
          }}
          className={
            i18n.dir() === "ltr"
              ? "testimonialsMobile"
              : "testimonialsMobile testimonialsMobileAr "
          }
        >
          {testimonialsData.map((item) => (
            <Carousel.Item
              interval={5000}
              key={item.id}
              className="testimonialsBackgroundImage"
            >
              {/* <img src={image} alt="Testimonials background image" /> */}
              <Carousel.Caption>
                <h3 style={{ color: "rgba(60, 74, 83, 0.57)" }}>{item.name}</h3>
                <h5 style={{ color: "rgba(60, 74, 83, 0.57)" }}>
                  {item.position}
                </h5>
                <p style={{ color: "rgba(60, 74, 83, 0.57)" }}>{item.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default Testimonials;
