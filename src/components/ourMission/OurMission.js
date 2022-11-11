import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const OurMission = ({ mainContent_ar, mainContent_en }) => {
  const { t, i18n } = useTranslation();

  return (
    <Box
      data-aos="zoom-in-up"
      data-aos-duration="1500"
      sx={{ textAlign: "center", marginTop: "5rem" }}
    >
      <Typography variant="h4" sx={{ fontWeight: "700" }}>
        <span
          style={{
            color: "#E87B5A",
          }}
        >
          {t("description.O")}
        </span>
        {t("description.ourMission")}
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
        className="ourMissionMobile"
        sx={{
          width: "60%",
          textAlign: "center",
          margin: "1rem auto",
          fontSize: "clamp(1rem, 3vw, 1.2rem)",
          fontWeight: "300",
          lineHeight: "1.4rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {i18n.dir() === "ltr" ? mainContent_en : mainContent_ar}
      </Typography>
    </Box>
  );
};

export default OurMission;
