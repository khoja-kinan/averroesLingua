import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import behance from "../../assets/partners/behance.png";
import google from "../../assets/partners/google.png";
import dribbble from "../../assets/partners/dribbble.png";
import Carousel from "react-multi-carousel";
import { useTranslation } from "react-i18next";
const Partners = () => {
  const { t } = useTranslation();
  return (
    <Box
      data-aos="zoom-in-down"
      data-aos-duration="1500"
      sx={{
        marginTop: "10rem",
        backgroundColor: "#FFFBF4",
        textAlign: "center",
        padding: "4rem 0 ",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
        <span
          style={{
            color: "#E87B5A",
          }}
        >
          {t("description.p")}
        </span>
        {t("description.partners")}
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
      <Typography className="partnersTextMobile">
        lorem ipsomlorem ipsomlorem ipsomlorem ipsomlorem ipsom
      </Typography>

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={4000}
        centerMode={false}
        className=""
        containerClass="container-with-dots PartnesContainerCarouselClass directionClass"
        dotListClass=""
        draggable
        focusOnSelect={true}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass="PartnesSliderClass"
        slidesToSlide={2}
        swipeable
        itemClass=""
      >
        <img
          src={behance}
          alt="behance"
          style={{ width: "200px", height: "auto" }}
        />
        <img
          src={google}
          alt="google"
          style={{ width: "200px", height: "auto", margin: "0 6rem" }}
        />
        <img
          src={dribbble}
          alt="dribbble"
          style={{ width: "200px", height: "auto" }}
        />
      </Carousel>
    </Box>
  );
};

export default Partners;
