import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const NewsLetter = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <Box
      data-aos="zoom-in-down"
      data-aos-duration="1500"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        gridAutoColumns: "1fr",
        background: "#FFFBF4",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "100px 100px 0px 0px",
        padding: "3rem 0 ",
      }}
    >
      <Typography
        className="newsletterTextMobile"
        variant="h5"
        sx={{ gridColumnStart: "2", gridColumnEnd: "6" }}
      >
        {t("description.newsLetter")}
      </Typography>
      <Box
        className="newsletterInputMobile"
        sx={{
          gridColumnStart: "7",
          gridColumnEnd: "12",
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridAutoColumns: "1fr",
        }}
      >
        <TextField
          id="outlined-basic"
          label={t("description.ContactUsEmail")}
          variant="outlined"
          sx={{
            gridColumn: "span 2",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius:
                  i18n.dir() === "ltr" ? "4px 0 0 4px" : " 0 4px 4px 0",
                textAlign: "left",
              },
              "&.Mui-focused fieldset": {
                borderRadius:
                  i18n.dir() === "ltr" ? "4px 0 0 4px" : " 0 4px 4px 0",
                borderWidth: "1px",
                borderColor: "rgba(60, 74, 83, 1)",
              },
              direction: "ltr",
            },
            "& .MuiFormLabel-root": {
              color: "rgba(60, 74, 83, 1)",
            },
            "& .MuiFormHelperText-root": {
              textAlign: i18n.dir() === "ltr" ? "left" : "right",
            },
          }}
          helperText={t("description.newsLetterUpdates")}
          value={email}
          onChange={handleChangeEmail}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(60, 74, 83, 1)",
            color: "white",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "rgba(60, 74, 83, 1)",
              color: "white",
            },
            height: "3em",
            padding: "28px 14px",
            borderTopLeftRadius: i18n.dir() === "ltr" ? "0" : " 4px",
            borderTopRightRadius: i18n.dir() === "ltr" ? "4px" : " 0",
            borderBottomLeftRadius: i18n.dir() === "ltr" ? "0" : " 4px",
            borderBottomRightRadius: i18n.dir() === "ltr" ? "4px" : " 0",
          }}
        >
          {t("description.Subscribe")}
        </Button>
      </Box>
    </Box>
  );
};

export default NewsLetter;
