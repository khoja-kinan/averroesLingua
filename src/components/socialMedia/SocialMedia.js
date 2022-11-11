import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";

const SocialMedia = () => {
  const { t } = useTranslation();
  return (
    <Box
      data-aos="zoom-in"
      data-aos-duration="1500"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        gridAutoColumns: "1fr",
        marginTop: "5rem",
        backgroundColor: "#FFFBF4",
        alignItems: "center",
        padding: "4rem 0 ",
      }}
    >
      <Typography
        className="followUsMobile"
        variant="h5"
        sx={{
          gridColumnStart: "3",
          gridColumnEnd: "7",
          fontWeight: "700",
          color: "#3C4A53",
        }}
      >
        {t("description.followusOnSocialMedia")}
      </Typography>
      <Box
        sx={{ gridColumnStart: "9", gridColumnEnd: "11" }}
        className="sociaMediaIcons"
      >
        <Link
          href="https://example.com"
          sx={{ color: "#3C4A53" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookRoundedIcon fontSize="large" />
        </Link>
        <Link
          href="https://example.com"
          sx={{ color: "#3C4A53" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon fontSize="large" sx={{ margin: " 0 2rem" }} />
        </Link>

        <Link
          href="https://example.com"
          sx={{ color: "#3C4A53" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon fontSize="large" />
        </Link>
      </Box>
    </Box>
  );
};

export default SocialMedia;
