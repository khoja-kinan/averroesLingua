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
  InputLabel,
  Select,
  OutlinedInput,
  Typography,
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
/* Editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  CreateBlogUrl,
  DeleteBlogUrl,
  EditBlogUrl,
  uploadBlogImage,
} from "../../../constants/urls";
import draftToHtml from "draftjs-to-html";
// ----------------------------------------------------------------------
//
export default function BlogMoreMenu({
  item,
  token,
  AllTagsList,
  AllCategoriesList,
  roles,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { t, i18n } = useTranslation();
  const [tittle, setTittle] = useState(item.title);
  const [brief, setBrief] = useState(item.brief);
  const [description, setDescription] = useState(item.description);
  const [metaTittle, setMetaTittle] = useState(item.meta_tittle);
  const [keyWords, setKeyWords] = useState(item.keyword);
  const [blogCategory, setBlogCategory] = useState(
    item.categories.map((i) => i.id)
  );
  const [blogTag, setBlogTag] = useState(item.tags.map((i) => i.id));
  const [BlogImageToShow, setBlogImageToShow] = useState(item.image);
  const [previewBlogImage, setPreviewBlogImage] = useState(null);
  const [BlogImageToUpload, setBlogImageToUpload] = useState(null);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(item.body)))
  );
  const imageURL = "https://example.com";

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
  const [openEdit, setOpenEdit] = useState(false);

  const [state, setState] = useState("");

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = () => {
    const formData = new FormData();
    formData.append("tittle", tittle);
    formData.append("brief", brief);
    formData.append(
      "body",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    formData.append("keyword", keyWords);
    formData.append("description", description);
    BlogImageToUpload !== null && formData.append("image", BlogImageToUpload);
    formData.append("meta_tittle", metaTittle);
    formData.append("category", blogCategory);
    formData.append("tag", blogTag);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${EditBlogUrl}${item.id}`, formData, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenEdit(false);
  };
  /* Delete */
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setIsOpen(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `${DeleteBlogUrl}${item.id}`,

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
        {roles.includes(22) && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenEdit}
          >
            <ListItemIcon>
              <Iconify icon="eva:edit-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={t("description.EditBlogButton")}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
        {roles.includes(23) && (
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
          fullScreen
          disableEscapeKeyDown
          open={openEdit}
          onClose={handleCloseEdit}
        >
          <DialogTitle>{t("description.EditBlogButton")} </DialogTitle>
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
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Blog Body
              </Typography>
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
            <Button onClick={handleCloseEdit}>
              {t("description.Cancel")}{" "}
            </Button>
            <Button onClick={handleEdit}>{t("description.Ok")} </Button>
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
            {t("description.DeleteBlogDialogTitle")}
          </DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              {t("description.DeleteBlogDialogMessage")}
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
