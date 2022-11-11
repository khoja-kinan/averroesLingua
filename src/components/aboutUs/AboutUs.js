import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const AboutUs = ({ mainContent_ar, mainContent_en }) => {
  const { t, i18n } = useTranslation();
  return (
    <Box
      id="aboutUs"
      sx={{ textAlign: "center", marginTop: "10rem" }}
      data-aos="zoom-in"
      data-aos-duration="1500"
    >
      <Typography variant="h4" sx={{ fontWeight: "700" }}>
        <span
          style={{
            color: "#E87B5A",
          }}
        >
          {t("description.A")}
        </span>
        {t("description.AboutUs")}
        <span
          style={{
            margin: "0 3px",
            height: "8px",
            width: "8px",
            backgroundColor: "#E87B5A",
            borderRadius: "50%",
            display: "inline-block",
          }}
        ></span>
      </Typography>
      <Typography
        className="aboutUsMobile"
        sx={{
          width: "70%",
          textAlign: "center",
          margin: "1rem auto",
          fontSize: "clamp(1rem, 3vw, 1.1rem)",
          whiteSpace: "pre-wrap",
        }}
      >
        {i18n.dir() === "ltr" ? mainContent_en : mainContent_ar}
      </Typography>
    </Box>
  );
};

export default AboutUs;
