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
import RolesCheckbox from "./RolesCheckbox";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { AllRolesUrl } from "../../../constants/urls";

// ----------------------------------------------------------------------

export default function PrivilegesMoreMenu({
  roleId,
  RoleName,
  token,
  AllPermissions,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openPrivilege, setOpenPrivilege] = useState(false);
  const [roleName, setRoleName] = useState(RoleName);
  const [state, setState] = useState("");
  const [PrivilegeDetailsProp, setPrivilegeDetailsProp] = useState([]);
  const { t } = useTranslation();
  /* 
      Privileges 
  */

  const handleChangeRoleName = (event) => {
    setRoleName(event.target.value);
  };

  const handleClickOpenPrivilege = () => {
    setOpenPrivilege(true);
  };

  const handleCloseEditPrivilege = () => {
    setOpenPrivilege(false);
    setIsOpen(false);
  };

  /* 
      Roels CheckBox
  */
  const handleConfirm = () => {
    const data = {
      name: roleName,
      permissions: PrivilegeDetailsProp,
    };

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .put(`${AllRolesUrl}/${roleId}`, data, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        /* window.location.reload(); */
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenPrivilege(false);
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
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenPrivilege}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("description.PrivilegepageEditButton")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <Dialog
          disableEscapeKeyDown
          open={openPrivilege}
          onClose={handleCloseEditPrivilege}
          className="PrivilegeDialog"
        >
          <DialogTitle>{t("description.PrivilegepageEditButton")} </DialogTitle>
          <DialogContent sx={{ width: "30rem" }}>
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
                  label={t("description.NewPrivilegeName")}
                  variant="outlined"
                  onChange={handleChangeRoleName}
                  value={roleName}
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <RolesCheckbox
                roleName={roleName}
                token={token}
                roleId={roleId}
                AllPermissions={AllPermissions}
                handleConfirm={handleConfirm}
                setPrivilegeDetailsProp={setPrivilegeDetailsProp}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditPrivilege}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirm}>{t("description.Ok")} </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
