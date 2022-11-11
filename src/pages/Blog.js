import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Loading from "../components/loading/Loading";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Aos from "aos";
import { AllCategoriesUrl, AllTagsUrl } from "../dashboard/constants/urls";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [blogData, setBlogData] = useState();
  const [blogDataToShow, setBlogDataToshow] = useState();
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [category, setCategory] = useState("");
  const imageUrl = "https://example.com";

  document.body.dir = i18n.dir();

  async function fecthBlogData() {
    await axios
      .get("https://example.com")
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setBlogData(data);
          setBlogDataToshow(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  async function fecthCategoriesData() {
    await axios
      .get(AllCategoriesUrl)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.category;
          setCategories(data);
          setLoading2(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  async function fecthTagsData() {
    await axios
      .get(AllTagsUrl)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.tags;
          setTags(data);
          setLoading3(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  useEffect(() => {
    Aos.init();
    window.scrollTo(0, 0);
    fecthBlogData();
    fecthCategoriesData();
    fecthTagsData();
  }, []);
  if (loading || loading2 || loading3) {
    return <Loading color="warning" />;
  }

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    event.target.value === "all"
      ? setBlogDataToshow(blogData)
      : setBlogDataToshow(
          blogData.filter((item) =>
            item.CategoryFlitter.includes(event.target.value)
          )
        );
  };
  const handleClick = (id) => {
    setBlogDataToshow(blogData.filter((item) => item.TagFlitter.includes(id)));
  };
  return (
    <>
      <Header />
      <Box
        data-aos="zoom-in-down"
        data-aos-duration="1500"
        sx={{
          marginTop: "4rem",
          marginBottom: "7rem",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gridAutoColumns: "1fr",
          columnGap: "2rem",
        }}
      >
        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2rem",
            paddingBottom: "0.51rem",
            borderBottom: "1px solid rgba(60, 74, 83, 0.44)",
          }}
          className="BlogPageHeaderMobile"
        >
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{
              color: "#3C4A53",
              fontWeight: "700",
            }}
          >
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
                height: "10px",
                width: "10px",
                backgroundColor: "#E87B5A",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></span>
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              {t("description.category")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={category}
              onChange={handleChangeCategory}
              label={t("description.category")}
            >
              <MenuItem value="all">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {i18n.dir() === "ltr" ? item.name_en : item.name_ar}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            gridRowStart: "2",
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "2rem",
          }}
        >
          <Stack direction="row" spacing={2}>
            {tags.map((item) => (
              <Chip
                key={item.id}
                id={item.id}
                label={i18n.dir() === "ltr" ? item.name_en : item.name_ar}
                sx={{
                  backgroundColor: "#E87B5A",
                  cursor: "pointer",
                  margin: "0 1rem",
                }}
                onClick={() => handleClick(item.id)}
              />
            ))}
          </Stack>
        </Box>
        <Box
          sx={{
            gridRowStart: "3",
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            gridAutoColumns: "1fr",
            gap: "3rem",
          }}
          className="BlogsPageBlogsContainerMobile"
        >
          {blogData.length === 0 ? (
            <Typography sx={{ gridColumn: "span 12", textAlign: "center" }}>
              {i18n.dir() === "ltr"
                ? "There are no available posts"
                : "لا تتوفر أي مقالات حالياً"}
            </Typography>
          ) : (
            blogDataToShow.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.slug}`}
                style={{
                  color: "#E87B5A",
                  textDecoration: "none",
                  gridColumn: "span 4 ",
                }}
                className="BlogsPageCardMobile"
              >
                <Card
                  key={post.id}
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
                      src={`${imageUrl}${post.image}`}
                      alt={post.tittle}
                      style={{
                        position: "relative",
                        width: "calc(100%)",
                        borderTopLeftRadius: "40px",
                        borderTopRightRadius: "40px",
                      }}
                    />
                  </div>
                  <CardContent
                    className="blogCardContentMobile"
                    sx={{ textAlign: "left", padding: "1rem" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "#3C4A53", fontWeight: "700" }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#3C4A53", fontWeight: "400" }}
                    >
                      {post.brief}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "flex-end",
                      /*  direction: i18n.dir() === "ltr" ? "ltr" : "rtl", */
                      color: "#E87B5A",
                      padding: "1rem",
                    }}
                  >
                    {t("description.readMore")} <DoubleArrowIcon />
                  </CardActions>
                </Card>
              </Link>
            ))
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Blog;
