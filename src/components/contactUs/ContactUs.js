import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import location from "../../assets/contactUs/location.png";
import mail from "../../assets/contactUs/mail.png";
import phone from "../../assets/contactUs/phone.png";
import BackgroungImg from "../../assets/contactUs/contactUsBg.png";
import { useTranslation } from "react-i18next";

import { contactUsUrl } from "../../dashboard/constants/urls";
import axios from "axios";
import Swal from "sweetalert2";
const ContactUs = () => {
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [select, setSelect] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("");
  const [cv, setCV] = useState(null);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeSelect = (e) => {
    setSelect(e.target.value);
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const formData = new FormData();

  const handleUploadCv = (e) => {
    setCV(e.target.files[0]);
  };
  const handleSubmitContactUs = () => {
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    cv !== null && formData.append("cv", cv);

    const headers = {
      Accept: "application/json",
    };
    axios
      .post(contactUsUrl, formData, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            i18n.dir() === "ltr"
              ? "Your message has been sent successfully!"
              : "تم إرسال الرسالة بنجاح !",
          showConfirmButton: true,
        });
        setEmail("");
        setName("");
        setSelect("");
        setMessage("");
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
      });
  };

  return (
    <Box
      id="contactUs"
      sx={{ textAlign: "center", marginTop: "5rem", marginBottom: "10rem" }}
      className="contactUs"
    >
      <Typography
        variant="h3"
        data-aos="zoom-in-up"
        data-aos-duration="1500"
        sx={{ marginBottom: "1rem" }}
      >
        <span
          style={{
            color: "#E87B5A",
          }}
        >
          {t("description.c")}
        </span>
        {t("description.contactUs")}{" "}
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
      <Typography data-aos="zoom-in-up" data-aos-duration="1500">
        {t("description.ContactUsQuestions")}
      </Typography>
      <Box
        sx={{
          marginTop: "5rem",
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gridAutoColumns: "1fr",
        }}
      >
        <FormControl
          data-aos="zoom-in-down"
          data-aos-duration="1500"
          className="contactUsFormControlMobile"
          sx={{
            border: "1px rgba(221, 221, 221, 1) solid",
            padding: "1.5rem",
            borderRadius: "20px",
            gridRowStart: "2",
            gridColumnStart: "2",
            gridColumnEnd: "6",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: i18n.dir() === "ltr" ? "left" : "right",
              marginBottom: "1rem",
            }}
          >
            {t("description.ContactUs")}
          </Typography>
          <TextField
            id="filled-required"
            variant="filled"
            label={t("description.ContactUsName")}
            type="text"
            value={name}
            onChange={handleChangeName}
            sx={{
              marginBottom: "1rem",
              backgroundColor: "#F5F5F5",
              textAlign: i18n.dir() === "ltr" ? "left" : "right",
              float: i18n.dir() === "ltr" ? "left" : "right",
              "& label": {
                transformOrigin: i18n.dir() === "rtl" && "right !important",
                left: i18n.dir() === "rtl" && "inherit !important",
                right: i18n.dir() === "rtl" && "1.75rem !important",
              },
            }}
          />
          <TextField
            id="outlined-name"
            variant="filled"
            label={t("description.ContactUsEmail")}
            type="email"
            value={email}
            onChange={handleChangeEmail}
            sx={{
              backgroundColor: "#F5F5F5",
              "& label": {
                transformOrigin: i18n.dir() === "rtl" && "right !important",
                left: i18n.dir() === "rtl" && "inherit !important",
                right: i18n.dir() === "rtl" && "1.75rem !important",
              },
            }}
          />

          <FormControl
            fullWidth
            sx={{
              marginTop: "1rem",
              backgroundColor: "#F5F5F5",
              "& label": {
                transformOrigin: i18n.dir() === "rtl" && "right !important",
                left: i18n.dir() === "rtl" && "inherit !important",
                right: i18n.dir() === "rtl" && "1.75rem !important",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">
              {t("description.ContactUsHowCanWeHelp")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={select}
              variant="filled"
              onChange={handleChangeSelect}
              sx={{
                direction: i18n.dir() === "rtl" && "rtl",
              }}
              className={i18n.dir() === "ltr" ? "" : "contactUsSelectArArrow"}
            >
              <MenuItem value="Inquiry">
                {t("description.ContactUsInquiry")}
              </MenuItem>
              <MenuItem value="ApplyForJob">
                {t("description.ContactUsApplyForJob")}
              </MenuItem>
              <MenuItem value="contact">
                {t("description.ContactUsContact")}
              </MenuItem>
            </Select>
          </FormControl>
          {select === "ApplyForJob" && (
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <Button variant="contained" component="label">
                {t("description.ContactUsUploadUrCV")}
                <input
                  type="file"
                  accept="pdf"
                  hidden
                  onChange={handleUploadCv}
                />
              </Button>
            </FormControl>
          )}

          {select === "Inquiry" && (
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSc6A0rwmNeG88HML4ODbJbMuxWCJ4Fme9iTrsw-p9MMAnpqTA/viewform?vc=0&c=0&w=1&flr=0"
              target="_blank"
            >
              <Button variant="contained" component="label" sx={{ m: 1 }}>
                {t("description.completeForm")}
              </Button>
            </Link>
          )}

          <TextField
            id="outlined-textarea"
            label={t("description.ContactUsYourMessage")}
            multiline
            variant="filled"
            rows={4}
            sx={{
              marginTop: "1rem",
              backgroundColor: "#F5F5F5",
              "& label": {
                transformOrigin: i18n.dir() === "rtl" && "right !important",
                left: i18n.dir() === "rtl" && "inherit !important",
                right: i18n.dir() === "rtl" && "1.75rem !important",
              },
            }}
            value={message}
            onChange={handleChangeMessage}
          />
          <Box
            sx={{
              flexGrow: 0,
              gridColumnStart: "2",
              gridRowStart: "6",
            }}
          >
            <Chip
              label={t("description.ContactUsSend")}
              color="warning"
              sx={{
                marginTop: "1rem",
                padding: "20px 15px",
                backgroundColor: "#E87B5A",
                color: "#FFFEFD",
                fontSize: "18px",
                boxShadow:
                  "0px 12px 24px 6px rgba(253, 89, 86, 0.08), 0px 24px 48px 6px rgba(253, 89, 86, 0.08)",
              }}
              onClick={handleSubmitContactUs}
            />
          </Box>
        </FormControl>
        <Box
          className="contactUsIconsContainerMobile"
          data-aos-duration="1500"
          data-aos="fade-down"
          sx={{
            gridRowStart: "1",
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "grid",
            gridTemplateRows: "auto",
            gridAutoRows: "1fr",
          }}
        >
          <Box
            className="contactUsIconsMobile"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              className="contactUsLocationMobile"
              sx={{ textAlign: "center", maxWidth: "50%" }}
            >
              <img src={location} alt="location Icon" />

              <List
                sx={{
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                <ListItem>
                  <ListItemText
                    primary={t("description.ContactUsAddress")}
                    sx={{ textAlign: "center" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={t("description.ContactUsAddress2")}
                    sx={{ textAlign: "center" }}
                  />
                </ListItem>
              </List>
            </Box>
            <Box className="contactUsPhoneMobile">
              <img src={phone} alt="phone number icon" />
              <Typography
                sx={{ fontSize: "0.9rem", marginTop: "1rem", direction: "ltr" }}
              >
                <Link
                  sx={{ textDecoration: "none", color: "#000000" }}
                  href={`tel:+962-785331313`}
                >
                  + 962&nbsp;7&nbsp;8533&nbsp;1313
                </Link>
              </Typography>
            </Box>
            <Box>
              <img src={mail} alt="mail icon" />
              <Typography sx={{ fontSize: "0.9rem", marginTop: "1rem" }}>
                <Link
                  sx={{ textDecoration: "none", color: "#000000" }}
                  href={`mailto:info@averroeslingua.com`}
                >
                  info@averroeslingua.com
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className="contactUsImageMobile"
          sx={{
            gridRowStart: "2",
            gridColumnStart: "6",
            gridColumnEnd: "13",
            backgroundImage: `url(${BackgroungImg})`,
            backgroundPosition: "top",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
