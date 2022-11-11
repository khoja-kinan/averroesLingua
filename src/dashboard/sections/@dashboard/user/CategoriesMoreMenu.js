import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
  DialogContentText,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { NewCategoriesUrl } from "../../../constants/urls";

// ----------------------------------------------------------------------

export default function CategoriesMoreMenu({
  category_id,
  token,
  Arabic_name,
  English_name,
  roles,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [openCountry, setOpenCountry] = useState(false);
  const [arName, setArname] = useState(Arabic_name);
  const [enName, setEnName] = useState(English_name);
  const [state, setState] = useState("");
  const { t, i18n } = useTranslation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleChangeArName = (event) => {
    setArname(event.target.value);
  };

  const handleChangeEnName = (event) => {
    setEnName(event.target.value);
  };

  const handleClickOpenCountry = () => {
    setOpenCountry(true);
  };

  const handleCloseEditCountry = () => {
    setOpenCountry(false);
  };

  const handleConfirmEditCountry = () => {
    const data = { name_ar: arName, name_en: enName };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${NewCategoriesUrl}/update/${category_id}`, data, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenCountry(false);
  };
  /* Detelt Dialog */

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setIsOpen(false);
  };

  const handleConfirmDelete = () => {
    axios
      .post(
        `${NewCategoriesUrl}/delete/${category_id}`,
        { name: "" },
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "X-localization": i18n.language,
          },
        }
      )
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {roles.includes(25) && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenCountry}
          >
            <ListItemIcon>
              <Iconify icon="eva:edit-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={t("description.CategoriesEditPageButton")}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
        {roles.includes(26) && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenDeleteDialog}
          >
            <ListItemIcon>
              <Iconify icon="ep:delete-filled" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={t("description.Delete")}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
        <Dialog
          disableEscapeKeyDown
          open={openCountry}
          onClose={handleCloseEditCountry}
        >
          <DialogTitle>
            {t("description.CategoriesEditPageButton")}{" "}
          </DialogTitle>
          <DialogContent sx={{ width: "20rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.MedalsPageTabelHeadArName")}
                  variant="outlined"
                  onChange={handleChangeArName}
                  value={arName}
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.MedalsPageTabelHeadEnName")}
                  variant="outlined"
                  onChange={handleChangeEnName}
                  value={enName}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditCountry}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmEditCountry}>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("description.DeleteCategoryDialogTitle")}
          </DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              {t("description.DeleteCategoryDialogMessage")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>
              {" "}
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmDelete} autoFocus>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
