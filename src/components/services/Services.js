import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Services = ({ servicesData }) => {
  const { t, i18n } = useTranslation();
  const imageUrl = "https://example.com";
  return (
    <Box
      id="services"
      sx={{
        marginTop: "5rem",
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        gridAutoColumns: "1fr",
      }}
    >
      <Typography
        className="servicesMobile"
        data-aos="zoom-in-up"
        data-aos-duration="1500"
        variant="h3"
        sx={{
          gridColumnStart: "1",
          gridColumnEnd: "13",
          gridRowStart: "1",
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: "#E87B5A",
          }}
        >
          {t("description.s")}
        </span>
        {t("description.services")}
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

      <Box
        sx={{
          marginTop: "5rem",
          gridColumnStart: "2",
          gridColumnEnd: "12",
          gridRowStart: "4",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gridAutoColumns: "1fr",
          gap: "1rem",
        }}
        className="servicesContainer"
        id="servicesContainer"
      >
        <Box
          className="servicesCardsContainer"
          data-aos="zoom-in-down"
          data-aos-duration="1500"
          sx={{
            marginTop: "2rem",
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "grid",
            gridTemplateColumns: "repeat(8,1fr)",
            rowGap: "4rem",
            columnGap: "3rem",
          }}
        >
          {servicesData.services.map((service) => (
            <Card
              key={service.tittle_en}
              sx={{
                gridColumn: "span 2",
                boxShadow: "0px 2px 10px rgb(0 0 0 / 25%)",
                filter: "drop-shadow(0px 50px 80px rgba(255, 238, 232, 0.58))",
                borderRadius: "40px",
                height: "250px",
              }}
              className="cardHover serviceCardMobile"
            >
              <Link
                to={`/service/${service.slug}`}
                style={{ textDecoration: "none", color: "#272D4E" }}
              >
                <CardActionArea
                  sx={{ height: "100%" }}
                  className="cardActionArea"
                >
                  <div style={{ position: "relative", textAlign: "center" }}>
                    <img
                      src={`${imageUrl}${service.image}`}
                      alt={service.tittle_en}
                      style={{
                        margin: "0 auto",
                        position: "relative",
                        width: "100%",
                      }}
                      className="serviceImage"
                    />
                  </div>
                  <CardContent
                    sx={{
                      height: "100%",
                      backgroundColor: "rgba(232, 123, 90, 0.2)",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderTopLeftRadius: "60px 40px",
                      borderTopRightRadius: "60px 40px",
                    }}
                  >
                    <Typography
                      gutterBottom
                      component="p"
                      sx={{
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: "0.9rem",
                        height: "70px",
                        marginBottom: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {i18n.dir() === "ltr"
                        ? service.tittle_en
                        : service.tittle_ar}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Services;
