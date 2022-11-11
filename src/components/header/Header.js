import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/AverroesLogo.png";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import LanguagePopover from "../../dashboard/layouts/dashboard/LanguagePopover";
import { useTranslation } from "react-i18next";

const pages = [
  { nameEn: "Home", nameAr: "الرئيسية", href: "/#hero" },
  { nameEn: "About Us", nameAr: "من نحن", href: "/#aboutUs" },
  { nameEn: "Services", nameAr: "خدماتنا", href: "/#services" },
  { nameEn: "Contact Us", nameAr: "تواصلوا معنا", href: "/contact-us" },
  { nameEn: "Blog", nameAr: "المدونة", href: "/blog" },
];
const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -100;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { t, i18n } = useTranslation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignin = () => {
    return null;
  };
  /* scroll to top */
  function ScrollTop(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });
    const handleClick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    return (
      <Zoom in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 16, right: 16, zIndex: "9999" }}
        >
          {children}
        </Box>
      </Zoom>
    );
  }

  return (
    <>
      <AppBar
        id="#home"
        position="sticky"
        className="AppBarMobile"
        sx={{
          backgroundColor: "#ffffff",

          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <Container maxWidth="xl" className="headerContainerBig">
          <Toolbar disableGutters id="back-to-top-anchor">
            <Link style={{ cursor: "pointer" }} to={{ pathname: "/" }}>
              <img
                src={Logo}
                alt={"logo"}
                height={"70vw"}
                width={"100%"}
                className="headerlogoBig"
              />
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="warning"
              >
                <MenuIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.nameEn} onClick={handleCloseNavMenu}>
                    <HashLink
                      smooth
                      to={page.href}
                      style={{ textDecoration: "none", color: "#E87B5A" }}
                    >
                      <Typography textAlign="center">
                        {i18n.dir() === "ltr" ? page.nameEn : page.nameAr}
                      </Typography>
                    </HashLink>
                  </MenuItem>
                ))}
                <MenuItem>
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    <Chip
                      color="warning"
                      label={t("description.EmployeeSignIn")}
                      onClick={handleSignin}
                      sx={{ padding: "0 15px" }}
                    />
                  </Link>
                </MenuItem>
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <HashLink
                  key={page.nameEn}
                  smooth
                  to={page.href}
                  scroll={(el) => scrollWithOffset(el)}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      my: 2,
                      fontSize: "clamp(0.8rem, 3vw, 1.1rem);",
                      color: "black",
                      display: "block",
                      textTransform: "none",
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "transparent",
                        color: "#E87B5A",
                      },
                      "&.MuiButtonBase-root:after": {
                        content: '" "',
                        position: "absolute",
                        left: "0",
                        bottom: "-2px",
                        width: "0px",
                        height: "2px",
                        background: "#E87B5A",

                        transition: "all 0.45s",
                      },
                      "&.MuiButtonBase-root:hover:after": {
                        width: "60%",
                        left: "8px",
                      },
                      "&.MuiButtonBase-root:focus": {
                        color: "#E87B5A",
                      },
                      "&.MuiButtonBase-root:focus:after": {
                        width: "60%",
                        left: "8px",
                        background: "#E87B5A",
                      },
                    }}
                    className="headerLinksBig"
                  >
                    {i18n.dir() === "ltr" ? page.nameEn : page.nameAr}
                  </Button>
                </HashLink>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <Chip
                  color="warning"
                  label={t("description.EmployeeSignIn")}
                  onClick={handleSignin}
                  sx={{
                    padding: "10px 15px",
                    width: "17vw",
                    height: "2.5vw",
                    fontSize: "1rem",
                  }}
                  className="headerSignInBig"
                />
              </Link>
            </Box>
            <Box sx={{ margin: "1rem" }}>
              <LanguagePopover color="#E87B5A" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ScrollTop {...props}>
        <Fab color="warning" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};
export default Header;
