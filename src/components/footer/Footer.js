import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
/* import { useTranslation } from "react-i18next"; */
import facebook from "../../assets/footer/facebook.png";
import insta from "../../assets/footer/insta.png";
import linkedin from "../../assets/footer/linkedin.png";
const Footer = () => {
  /*  const { t } = useTranslation(); */

  return (
    <Box
      sx={{
        padding: "2rem 0 0 0",
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        gridAutoColumns: "1fr",
        backgroundColor: "#3C4A53",
      }}
    >
      <Box
        sx={{
          gridColumnStart: "2",
          gridColumnEnd: "12",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gridAutoColumns: "1fr",
          borderBottom: "1px solid #FFFFFF",
          paddingBottom: "1rem",
        }}
      >
        {/* <Box
          className="footerInformationMobile"
          sx={{
            gridColumnStart: "1",
            gridColumnEnd: "4",
            display: "grid",
            gridTemplateColumns: "1fr",
            gridAutoColumns: "1fr",
            gridAutoRows: "1fr",
          }}
        >
          <Typography sx={{ color: "#ADADAD", alignSelf: "center" }}>
            {t("description.footerInfotmation")}
          </Typography>
          <Box
            sx={{
              gridRowStart: "2",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              color: "#FFFFFF",
            }}
          >
            <Link href="#" underline="none" sx={{ color: "#FFFFFF" }}>
              {t("description.footerPrivacyPolicy")}
            </Link>

            <Link href="#" underline="none" sx={{ color: "#FFFFFF" }}>
              {t("description.footerTermsOfService")}
            </Link>
          </Box>
        </Box> */}
        <Box
          className="footerFollowUsMobile"
          sx={{
            gridColumnStart: "11",
            gridColumnEnd: "13",
            display: "grid",
            gridTemplateColumns: "1fr",
            gridAutoColumns: "1fr",
            gridAutoRows: "1fr",
          }}
        >
          <Box
            className="footerIconsContainerMobile"
            sx={{
              gridRowStart: "2",
              alignSelf: "center",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <Link
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ color: "#FFFFFF" }}
            >
              <img src={facebook} alt="facebook Logo" width={20} />
            </Link>
            <Link
              className="mobileMarginLR"
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ color: "#FFFFFF" }}
            >
              <img src={insta} alt="insta Logo" width={20} />
            </Link>

            <Link
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ color: "#FFFFFF" }}
            >
              <img src={linkedin} alt="facebook Logo" width={20} />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          gridColumnStart: "2",
          gridColumnEnd: "12",
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
      >
        <Typography
          className="allRightsMobile"
          sx={{
            padding: "1rem",
            color: "#FFFFFF",
            fontSize: "0.7rem",
            direction: "ltr",
          }}
        >
          © 2022 AVERREOS. All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
