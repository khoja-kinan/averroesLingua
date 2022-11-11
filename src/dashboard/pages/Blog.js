import { filter } from "lodash";
import axios from "axios";
import {
  AllBlogsUrl,
  AllCategoriesUrl,
  AllRolesUrl,
  AllTagsUrl,
  CreateBlogUrl,
  createUserList,
  uploadBlogImage,
} from "../constants/urls";

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
  MenuItem,
  OutlinedInput,
  Select,
  InputLabel,
} from "@mui/material";

// components

import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import { LinearProgress } from "@mui/material";
import SearchNotFound from "../components/SearchNotFound";
import {
  BlogMoreMenu,
  UserListHead,
  UserListToolbar,
  UserMoreMenu1,
} from "../sections/@dashboard/user";
import { useTranslation } from "react-i18next";

/* Editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Label from "../components/Label";
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
  const imageURL = "https://example.com";
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);

  const [tittle, setTittle] = useState("");
  const [brief, setBrief] = useState("");
  const [description, setDescription] = useState("");
  const [metaTittle, setMetaTittle] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [blogCategory, setBlogCategory] = useState([]);
  const [blogTag, setBlogTag] = useState([]);
  const [BlogImageToShow, setBlogImageToShow] = useState();
  const [previewBlogImage, setPreviewBlogImage] = useState(null);
  const [BlogImageToUpload, setBlogImageToUpload] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [BlogList, setBlogList] = useState();
  const [AllCategoriesList, setAllCategoriesList] = useState();
  const [AllTagsList, setAllTagsList] = useState();

  let navigate = useNavigate();
  const token = localStorage.getItem("api-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(AllBlogsUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              setBlogList(data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
        axios
          .get(AllCategoriesUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data.category;
              setAllCategoriesList(data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
        axios
          .get(AllTagsUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data.tags;
              setAllTagsList(data);
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
  if (
    loading === true ||
    AllCategoriesList === undefined ||
    AllTagsList === undefined ||
    BlogList === undefined
  ) {
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
        (_user) =>
          _user.tittle.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  const TABLE_HEAD = [
    {
      id: "tittle",
      label: t("description.BlogPageTableHeadTittle"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "roles_name",
      label: t("description.BlogPageTableHeadDescription"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "category",
      label: t("description.BlogPageTableHeadCategory"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "tags",
      label: t("description.BlogPageTableHeadTags"),
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
      const newSelecteds = BlogList.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - BlogList.length) : 0;

  const filteredUsers = applySortFilter(
    BlogList,
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
  const handleChangeBlogTittle = (event) => {
    setTittle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeBrief = (event) => {
    setBrief(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setBlogCategory(event.target.value);
  };
  const handleChangeTag = (event) => {
    setBlogTag(event.target.value);
  };
  const handleChangeKeyWords = (event) => {
    setKeyWords(event.target.value);
  };
  const handleChangeMetaTittle = (event) => {
    setMetaTittle(event.target.value);
  };
  const handleCaptureBlogImage = (e) => {
    setBlogImageToShow(null);
    setBlogImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewBlogImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleAddNew = () => {
    const formData = new FormData();
    formData.append("tittle", tittle);
    formData.append("brief", brief);
    formData.append(
      "body",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    formData.append("keyword", keyWords);
    formData.append("description", description);
    formData.append("image", BlogImageToUpload);
    formData.append("meta_tittle", metaTittle);
    formData.append("category", blogCategory);
    formData.append("tag", blogTag);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(CreateBlogUrl, formData, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        setOpenNewUser(false);
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  };
  /* editor */
  const updateTextDescription = (state) => {
    setEditorState(state);

    const data = convertToRaw(editorState.getCurrentContent());
  };

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };

      const data = new FormData();
      data.append("image", file);
      axios
        .post(uploadBlogImage, data, { headers })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  return (
    <Page title={t("description.BlogPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("description.BlogPageTitle")}
          </Typography>
          {roles.includes(21) && (
            <Button variant="contained" onClick={handleClickOpenNewUser}>
              {t("description.BLogsPageNewBlog")}
            </Button>
          )}
        </Stack>
        <Dialog
          fullScreen
          disableEscapeKeyDown
          open={openNewUser}
          onClose={handleCloseNewUser}
        >
          <DialogTitle>{t("description.NewBlogDialogTitle")} </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "40%" }}>
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
                      label={t("description.NewBlogDialogTittle")}
                      variant="outlined"
                      onChange={handleChangeBlogTittle}
                      value={tittle}
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
                      label={t("description.NewBlogDialogBrief")}
                      variant="outlined"
                      onChange={handleChangeBrief}
                      value={brief}
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
                      label={t("description.NewBlogDialogDescription")}
                      variant="outlined"
                      onChange={handleChangeDescription}
                      value={description}
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
                      label={t("description.NewBlogDialogMetaTittle")}
                      variant="outlined"
                      onChange={handleChangeMetaTittle}
                      value={metaTittle}
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
                      label={t("description.NewBlogDialogKeyWords")}
                      variant="outlined"
                      onChange={handleChangeKeyWords}
                      value={keyWords}
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
                      {t("description.BlogPageTableHeadCategory")}{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={blogCategory}
                      multiple
                      onChange={handleChangeCategory}
                      input={
                        <OutlinedInput
                          label={t("description.BlogPageTableHeadCategory")}
                        />
                      }
                    >
                      {AllCategoriesList.map((category) => (
                        <MenuItem value={category.id} key={category.id}>
                          {i18n.dir() === "ltr"
                            ? category.name_en
                            : category.name_ar}
                        </MenuItem>
                      ))}
                    </Select>
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
                      {t("description.BlogPageTableHeadTags")}{" "}
                    </InputLabel>
                    <Select
                      multiple
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={blogTag}
                      onChange={handleChangeTag}
                      input={
                        <OutlinedInput
                          label={t("description.BlogPageTableHeadTags")}
                        />
                      }
                    >
                      {AllTagsList.map((tag) => (
                        <MenuItem value={tag.id} key={tag.id}>
                          {i18n.dir() === "ltr" ? tag.name_en : tag.name_ar}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box sx={{ width: "40%" }}>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    width: "100%",
                  }}
                >
                  <Typography>{t("description.BlogImage")}</Typography>
                  <FormControl sx={{ m: 1, maxWidth: "100%" }}>
                    <Box className="upload__image-wrapper">
                      {previewBlogImage ? (
                        <Box className="image-item">
                          <img src={previewBlogImage} alt="" width="100%" />
                          <Box className="image-item__btn-wrapper">
                            <Button
                              sx={{ margin: "1rem 0" }}
                              variant="outlined"
                              onClick={() => setPreviewBlogImage(null)}
                            >
                              {t("description.remove")}
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          component="label"
                        >
                          {t("description.uploadBlogImage")}
                          <input
                            type="file"
                            accept="image/png"
                            hidden
                            onChange={handleCaptureBlogImage}
                          />
                        </Button>
                      )}
                      {BlogImageToShow && (
                        <Box className="image-item" sx={{ margin: "1rem 0" }}>
                          <img
                            src={`${imageURL}${BlogImageToShow}`}
                            alt=""
                            width="80%"
                          />
                          <Box className="image-item__btn-wrapper">
                            <Button
                              sx={{ margin: "1rem 0" }}
                              variant="outlined"
                              onClick={() => setBlogImageToShow(null)}
                            >
                              {t("description.remove")}
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box sx={{ margin: "2rem 0" }}>
              <Typography>Blog Body</Typography>
              <Editor
                editorState={editorState}
                onEditorStateChange={updateTextDescription}
                editorClassName="editorClass"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: {
                    uploadCallback: uploadImageCallBack,
                    alt: { present: true, mandatory: false },
                  },
                }}
              />
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
            placeHolder={t("description.BlogsPageSearchPlaceholder")}
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
                  rowCount={BlogList.length}
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
                              {row.title}
                            </Typography>
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.description}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.categories.map((item) => (
                              <Label variant="ghost" key={item.id}>
                                {i18n.dir() === "ltr"
                                  ? item.name_en
                                  : item.name_ar}
                              </Label>
                            ))}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.tags.map((item) => (
                              <Label variant="ghost" key={item.id}>
                                {i18n.dir() === "ltr"
                                  ? item.name_en
                                  : item.name_ar}
                              </Label>
                            ))}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <BlogMoreMenu
                              roles={roles}
                              token={token}
                              item={row}
                              AllCategoriesList={AllCategoriesList}
                              AllTagsList={AllTagsList}
                            />
                          </TableCell>
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
            count={BlogList.length}
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
