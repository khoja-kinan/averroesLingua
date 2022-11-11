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
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { userListUrl } from "../../../constants/urls";

// ----------------------------------------------------------------------

export default function UserMoreMenu1({
  user_id,
  token,
  name,
  email,
  role,
  rolesList,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");
  const [username, setUserName] = useState(name);
  const [UserEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [UserRole, setUserRole] = useState(role);
  /* 
      User Edit
  */

  const [openEditUser, setOpenEditUser] = useState(false);

  const handleClickOpenEditUser = () => {
    setOpenEditUser(true);
  };

  const handleCloseEditUser = () => {
    setOpenEditUser(false);
    setIsOpen(false);
  };

  const handleEditUsername = (e) => {
    setUserName(e.target.value);
  };
  const handleEdituserEmail = (e) => {
    setUserEmail(e.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleEditUserRole = (e) => {
    setUserRole(e.target.value);
  };

  const handleSubmitEditBalance = () => {
    const data = {};
    if (username !== name) {
      data.name = username;
    }
    if (UserEmail !== email) {
      data.email = UserEmail;
    }
    if (password !== "") {
      data.password = password;
    }
    if (role !== UserRole) {
      data.roles_name = UserRole;
    }
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .put(`${userListUrl}/${user_id}`, data, {
        headers,
      })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenEditUser(false);
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
          onClick={handleClickOpenEditUser}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("description.UsersPageEditUser")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <Dialog
          disableEscapeKeyDown
          open={openEditUser}
          onClose={handleCloseEditUser}
        >
          <DialogTitle>{t("description.UsersPageEditUser")}</DialogTitle>
          <DialogContent sx={{ width: "20rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.UsersPageTableHeadUsername")}
                  variant="outlined"
                  onChange={handleEditUsername}
                  value={username}
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
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.UsersPageTableHeadEmail")}
                  variant="outlined"
                  onChange={handleEdituserEmail}
                  value={UserEmail}
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
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.NewUserDialogPassword")}
                  variant="outlined"
                  onChange={handleChangePassword}
                  value={password}
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
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel id="demo-dialog-select-label">
                  {t("description.NewUserDialogPrivileges")}{" "}
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={UserRole}
                  onChange={handleEditUserRole}
                  input={
                    <OutlinedInput
                      label={t("description.NewUserDialogPrivileges")}
                    />
                  }
                >
                  {rolesList.map((role) => (
                    <MenuItem value={role.name} key={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditUser}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleSubmitEditBalance}>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
