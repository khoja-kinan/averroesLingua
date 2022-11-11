import { filter } from "lodash";
import axios from "axios";
import { AllRolesUrl, createUserList, userListUrl } from "../constants/urls";

/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Box,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

// components

import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import { LinearProgress } from "@mui/material";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu1,
} from "../sections/@dashboard/user";
import { useTranslation } from "react-i18next";
//
/* import USERLIST from "../_mocks_/user"; */
// get Users Function
/* import GetUsers from "../controller/GetUsers"; */
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function User() {
  const { t, i18n } = useTranslation();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [privilege, setPrivilege] = useState("");

  const [USERLIST, setUSERLIST] = useState();
  const [rolesList, setRolesList] = useState([]);
  let navigate = useNavigate();
  const token = localStorage.getItem("api-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(userListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data.user;
              setUSERLIST(data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
        axios
          .get(AllRolesUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data.role;
              setRolesList(data);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, [navigate]);
  if (loading === true || USERLIST === undefined) {
    return <LinearProgress />;
  }
  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  const TABLE_HEAD = [
    {
      id: "name",
      label: t("description.UsersPageTableHeadUsername"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "email",
      label: t("description.UsersPageTableHeadEmail"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "roles_name",
      label: t("description.UsersPageTableHeadRole"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    { id: "" },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const handleClickOpenNewUser = () => {
    setOpenNewUser(true);
  };

  const handleCloseNewUser = () => {
    setOpenNewUser(false);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePrivilege = (event) => {
    setPrivilege(event.target.value);
  };
  const handleAddNew = () => {
    const data = {
      name: username,
      email: email,
      password: password,
      "confirm-password": password,
      roles_name: privilege,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(createUserList, data, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenNewUser(false);
  };

  return (
    <Page title={t("description.UsersPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("description.UsersPageTitle")}
          </Typography>
          {roles.includes(7) && (
            <Button variant="contained" onClick={handleClickOpenNewUser}>
              {t("description.UsersPageNewUser")}
            </Button>
          )}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewUser}
          onClose={handleCloseNewUser}
        >
          <DialogTitle>{t("description.NewUserDialogTitle")} </DialogTitle>
          <DialogContent sx={{ width: "22rem" }}>
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
                  label={t("description.NewUserDialogUsername")}
                  variant="outlined"
                  onChange={handleChangeUsername}
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
                  label={t("description.NewUserDialogEmail")}
                  variant="outlined"
                  onChange={handleChangeEmail}
                  value={email}
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
                  value={privilege}
                  onChange={handleChangePrivilege}
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
            <Button onClick={handleCloseNewUser}>
              {t("description.Cancel")}{" "}
            </Button>
            <Button onClick={handleAddNew}>{t("description.Ok")} </Button>
          </DialogActions>
        </Dialog>
        <Card>
          <UserListToolbar
            placeHolder={t("description.UsersPageSearchPlaceholder")}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, roles_name, email } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {email}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Label variant="ghost">{roles_name}</Label>
                          </TableCell>

                          {roles.includes(9) && (
                            <TableCell
                              align={i18n.dir() === "ltr" ? "right" : "left"}
                            >
                              <UserMoreMenu1
                                user_id={id}
                                token={token}
                                name={name}
                                email={email}
                                role={roles_name}
                                rolesList={rolesList}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("description.UsersPageLabelRowsPerPage")}
            sx={{ direction: "ltr" }}
          />
        </Card>
      </Container>
    </Page>
  );
}
