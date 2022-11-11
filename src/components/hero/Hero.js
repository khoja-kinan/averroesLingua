import Box from "@mui/material/Box";
import { Chip, Typography } from "@mui/material";
import heroBg from "../../assets/hero/heroBG.webp";
import heroBgAr from "../../assets/hero/heroBgAr.webp";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import TypeWriterEffect from "react-typewriter-effect";
import CountUp from "react-countup";
const Hero = ({ counter1, counter2 }) => {
  const { t, i18n } = useTranslation();
  return (
    <Box
      id="hero"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
      }}
    >
      <Box
        className={
          i18n.dir() === "ltr"
            ? "heroMobileMainSection"
            : "heroMobileMainSectionAr"
        }
        sx={{
          marginTop: "1rem",
          gridColumnStart: "2",
          gridColumnEnd: "12",
          display: "grid",
          gridTemplateColumns: "repeat(12 , 1fr)",
          gridTemplateRows: "repeat(6 ,80px)",
          gridAutoRows: "80px",
          gridAutoColumns: "1fr",
          columnGap: "1rem",
          backgroundImage:
            i18n.dir() === "ltr" ? `url(${heroBg})` : `url(${heroBgAr})`,

          backgroundPosition:
            i18n.dir() === "ltr" ? "bottom right" : "bottom left",

          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          paddingBottom: "3rem",
        }}
      >
        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "8",
            gridRowStart: "2",
            alignSelf: "end",
            direction: "ltr",
          }}
        >
          <TypeWriterEffect
            textStyle={{
              fontSize: "clamp(1.8rem, 3vw, 2.9rem)",
              textAlign: i18n.dir() === "ltr" ? "left" : "right",
            }}
            startDelay={100}
            cursorColor="black"
            className="heroTextBig"
            typeSpeed={150}
            multiText={[
              "Welcome",
              "أهلاً بكم",
              "Bienvenidas",
              "Bienvenue",
              "добро пожаловать",
              i18n.dir() === "ltr" ? " Welcome" : "أهلاً بك",
            ]}
          ></TypeWriterEffect>
        </Box>
        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "10",
            gridRowStart: "3",
            alignSelf: "end",
            direction: "ltr",
          }}
          className="HeroSlogan"
        >
          <Typography
            sx={{
              fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
              textAlign: i18n.dir() === "ltr" ? "left" : "right",
            }}
          >
            {i18n.dir() === "ltr"
              ? "Utilize the minutes, globalize the meaning"
              : "كلماتٌ تنحت أبعاد اللغة"}
          </Typography>
        </Box>
        <Box
          className="heroChipBoxBig"
          sx={{
            flexGrow: 0,
            gridColumnStart: "2",
            gridColumnEnd: "5",
            gridRowStart: "4",
            gridRowEnd: "5",
            alignSelf: "end",
          }}
        >
          <HashLink smooth to="#services" style={{ textDecoration: "none" }}>
            <Chip
              className="heroChipBig"
              label={t("description.heroOurServicesChip")}
              color="warning"
              sx={{
                padding: "20px 15px",
                backgroundColor: "#E87B5A",
                color: "#FFFEFD",
                fontSize: "18px",
                boxShadow:
                  "0px 12px 24px 6px rgba(253, 89, 86, 0.08), 0px 24px 48px 6px rgba(253, 89, 86, 0.08)",
              }}
            />
          </HashLink>
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            gridColumnStart: "2",
            gridColumnEnd: "5",
            gridRowStart: "6",
            alignSelf: "end",
            textAlign: "center",
            boxShadow:
              "0px 12px 24px 6px rgba(253, 89, 86, 0.08), 0px 24px 48px 6px rgba(253, 89, 86, 0.08)",
            borderRadius: "5px",
            backgroundColor: "#E87B5A",
            padding: "0.5rem 0rem",
          }}
          className="HeroCounter1Mobile"
        >
          <CountUp
            start={counter1.value}
            end={70000}
            delay={0}
            duration={70000}
            decimal=","
            separator=","
          >
            {({ countUpRef }) => (
              <div>
                <span className="HeroCounter">+ </span>
                <span className="HeroCounter" ref={countUpRef} />
                {/* <span className="HeroCounter">
                  {" "}
                  {i18n.dir() === "ltr" ? " K" : "ألف "}
                </span> */}
                <Typography className="HeroCounterText">
                  {i18n.dir() === "ltr" ? counter1.name_en : counter1.name_ar}
                </Typography>
              </div>
            )}
          </CountUp>
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            gridColumnStart: "5",
            gridColumnEnd: "8",
            gridRowStart: "6",
            alignSelf: "end",
            textAlign: "center",
            boxShadow:
              "0px 12px 24px 6px rgba(253, 89, 86, 0.08), 0px 24px 48px 6px rgba(253, 89, 86, 0.08)",
            borderRadius: "5px",
            padding: "0.5rem 0rem",
            backgroundColor: "#fff",
          }}
          className="HeroCounter2Mobile"
        >
          <CountUp
            start={counter2.value}
            end={3000000}
            delay={0}
            duration={800000}
            decimal=","
            separator=","
          >
            {({ countUpRef }) => (
              <div>
                <span className="HeroCounter">+ </span>
                <span className="HeroCounter" ref={countUpRef} />
                {/* <span className="HeroCounter">
                  {i18n.dir() === "ltr" ? " M" : " مليون"}
                </span> */}
                <Typography className="HeroCounterText">
                  {i18n.dir() === "ltr" ? counter2.name_en : counter2.name_ar}
                </Typography>
              </div>
            )}
          </CountUp>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
