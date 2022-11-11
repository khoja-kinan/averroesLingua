import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { CardMedia } from "@mui/material";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Loading from "../components/loading/Loading";
import axios from "axios";
import AOS from "aos";
import { Helmet } from "react-helmet-async";
import draftToHtml from "draftjs-to-html";
const SinglePost = () => {
  const imageUrl = "https://example.com";
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [blogData, setBlogData] = useState();
  const [blogs, setBlogs] = useState();

  const URL = `https://example.com`;
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  async function fecthBlogData() {
    await axios
      .get(URL)
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
  async function fecthBlogs() {
    await axios
      .get("https://example.com")
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setBlogs(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  useEffect(() => {
    AOS.init();
    window.scrollTo(0, 0);

    fecthBlogData();
    fecthBlogs();
  }, []);
  return loading ? (
    <Loading />
  ) : loading2 ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <meta name="description" content={blogData.blog[0].description} />
        <meta type="title" content={blogData.blog[0].meta_tittle} />
        <meta name="keywords" content={blogData.blog[0].keyword} />
      </Helmet>
      <Header />
      <Box
        sx={{
          marginTop: "7rem",
          marginBottom: "7rem",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gridAutoColumns: "1fr",
        }}
      >
        <Box
          className="blogCardMobile"
          sx={{ gridColumnStart: "2", gridColumnEnd: "8" }}
          data-aos="zoom-in-down"
          ذ
        >
          <Card
            sx={{
              borderRadius: "40px",
              boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "calc(100%)",
                maxWidth: "calc(100%)",
              }}
            >
              <img
                src={`${imageUrl}${blogData.blog[0].image}`}
                alt={blogData.blog[0].tittle}
                style={{
                  position: "relative",
                  width: "calc(100%)",
                  borderTopLeftRadius: "40px",
                  borderTopRightRadius: "40px",
                  padding: "1rem",
                }}
              />
            </div>
            <CardContent
              className="blogCardContentMobile"
              sx={{ textAlign: "left", padding: "2rem 3rem" }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#3C4A53", fontWeight: "700" }}
              >
                {blogData.blog[0].tittle}
              </Typography>
              <Box
                sx={{ color: "#3C4A53", fontWeight: "400" }}
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(JSON.parse(blogData.blog[0].body)),
                }}
              ></Box>
            </CardContent>
            <CardActions
              className="blogCardActionMobile"
              sx={{
                justifyContent: "center",
                borderTop: "1px solid rgba(60, 74, 83, 0.44)",
                margin: "1rem 3rem",
                padding: " 3rem 0 ",
              }}
            >
              <Box
                className="blogCardContentIconsMobile"
                sx={{ gridColumnStart: "8", gridColumnEnd: "11" }}
              >
                <a href="https://example.com" style={{ color: "#3C4A53" }}>
                  <FacebookRoundedIcon fontSize="large" />
                </a>
                <a href="https://example.com" style={{ color: "#3C4A53" }}>
                  <InstagramIcon fontSize="large" sx={{ margin: " 0 2rem" }} />
                </a>

                <a href="https://example.com" style={{ color: "#3C4A53" }}>
                  <LinkedInIcon fontSize="large" />
                </a>
              </Box>
            </CardActions>
          </Card>
        </Box>
        <Box
          className="sideBlogsMobile"
          sx={{ gridColumnStart: "9", gridColumnEnd: "12" }}
          data-aos="zoom-in-up"
          data-aos-duration="1500"
        >
          {blogs.map((item) => (
            <Link
              key={item.id}
              to={`/post/${item.slug}`}
              style={{ textDecoration: "none" }}
              onClick={() => {
                window.reload();
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  borderBottom: "1px solid #DEE1E6",
                  paddingBottom: "1rem",
                  transition: "unset",
                  boxShadow: "unset",
                  backgroundColor: "transparent",
                  marginBottom: "2rem",
                  borderRadius: "0",
                }}
                className="sniglePostPostsLinkHover"
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151, borderRadius: "10px" }}
                  image={`${imageUrl}${item.image}`}
                  alt={item.title}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto", padding: "0 1rem" }}>
                    <Typography component="div" variant="h6">
                      {item.title}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SinglePost;
