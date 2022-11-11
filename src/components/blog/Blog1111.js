import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
/* import { Link } from "@mui/material"; */
const Blog = ({ blogData }) => {
  const { t, i18n } = useTranslation();
  const imageUrl = "https://example.com";
  return (
    <Box
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
          {t("description.O")}
        </span>
        {t("description.ourBlog")}

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
      <Typography className="blogsTextMobile">
        {i18n.dir() === "ltr"
          ? "Stay posted with the latest articles and check out what our content writers have to say."
          : "تابعوا مدونتنا لتواكبوا آخر الأخبار والمقالات، وتعرفوا على ما يفكر به كتاب المحتوى لدينا."}
      </Typography>
      {blogData.length === 0 ? (
        <Typography sx={{ textAlign: "center", margin: "5rem 0" }}>
          {t("description.noPostToshow")}
        </Typography>
      ) : (
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={4000}
          centerMode={false}
          className=""
          containerClass="container-with-dots BlogsContainerCarouselClass directionClass"
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
          sliderClass="sliderClass"
          slidesToSlide={2}
          swipeable
          itemClass="itemClass"
        >
          {blogData.map((blog) => (
            <Link
              key={blog.id}
              to={`/post/${blog.slug}`}
              style={{ color: "#E87B5A", textDecoration: "none" }}
            >
              <Card
                sx={{
                  margin: "0 auto",
                  width: "80%",
                  borderRadius: "40px",
                  boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.25)",
                }}
                className="blogCarouselCard"
              >
                <div
                  style={{
                    position: "relative",
                    width: "calc(100%)",
                    maxWidth: "calc(100%)",
                  }}
                >
                  <img
                    src={`${imageUrl}${blog.image}`}
                    alt={blog.image}
                    style={{
                      position: "relative",
                      width: "calc(100%)",
                      padding: "1rem",
                      borderRadius: "40px",
                      textDecration: "none",
                    }}
                  />
                </div>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.brief}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "flex-end",
                    /*  direction: i18n.dir() === "ltr" ? "ltr" : "rtl", */
                    color: "#E87B5A",
                  }}
                >
                  {t("description.readMore")} <DoubleArrowIcon />
                </CardActions>
              </Card>
            </Link>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default Blog;
