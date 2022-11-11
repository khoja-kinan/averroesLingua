import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import blogPic from "../../assets/blog/blogPic.png";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Link } from "react-router-dom";
/* import { Link } from "@mui/material"; */
const Blog = () => {
  return (
    <Box
      sx={{
        marginTop: "10rem",
        marginBottom: "10rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">
        Our Blog
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
      <Typography>
        lorem ipsomlorem ipsomlorem ipsomlorem ipsomlorem ipsom
      </Typography>
      <Box
        sx={{
          marginTop: "5rem",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gridAutoColumns: "1fr",
        }}
      >
        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "grid",
            gridTemplateColumns: "repeat(9,1fr)",
            gridAutoColumns: "1fr",
            columnGap: "3rem",
          }}
        >
          <Card
            sx={{
              gridColumn: "span 3",
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
                src={blogPic}
                alt={blogPic}
                style={{
                  position: "relative",
                  width: "calc(100%)",
                  padding: "1rem",
                  borderRadius: "40px",
                }}
              />
            </div>
            <CardContent sx={{ textAlign: "left" }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Link
                to={"/post"}
                state={{ title: "Title", body: "Body", image: { blogPic } }}
                style={{ color: "#E87B5A", textDecration: "none" }}
              >
                Read More <DoubleArrowIcon />
              </Link>
            </CardActions>
          </Card>
          <Card
            sx={{
              gridColumn: "span 3",
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
                src={blogPic}
                alt={blogPic}
                style={{
                  position: "relative",
                  width: "calc(100%)",
                  padding: "1rem",
                  borderRadius: "40px",
                }}
              />
            </div>
            <CardContent sx={{ textAlign: "left" }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Link
                to={"/post"}
                state={{ title: "Title", body: "Body" }}
                style={{ color: "#E87B5A", textDecration: "none" }}
              >
                Read More <DoubleArrowIcon />
              </Link>
            </CardActions>
          </Card>{" "}
          <Card
            sx={{
              gridColumn: "span 3",
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
                src={blogPic}
                alt={blogPic}
                style={{
                  position: "relative",
                  width: "calc(100%)",
                  padding: "1rem",
                  borderRadius: "40px",
                }}
              />
            </div>
            <CardContent sx={{ textAlign: "left" }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Link
                to={"/post"}
                state={{ title: "Title", body: "Body", image: { blogPic } }}
                style={{ color: "#E87B5A", textDecration: "none" }}
              >
                Read More <DoubleArrowIcon />
              </Link>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Blog;
