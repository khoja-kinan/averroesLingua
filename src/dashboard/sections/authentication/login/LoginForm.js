import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// component
import Iconify from "../../../components/Iconify";
// login function
import { login } from "../../../controller/AuthController";
import { useCookies } from "react-cookie";
//
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { setAuth } = useAuth();
  const [cookie, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const loginUser = async () => {
    const result = await login(formik.values.email, formik.values.password);
    if (result.status === 200) {
      const username = result.data.user.name;
      const roles = result.data.permissions;
      setAuth({ username, roles });
      localStorage.setItem("Aviusername", username);
      localStorage.setItem("Aviuseremail", result.data.user.email);
      localStorage.setItem("roles", JSON.stringify(roles));

      localStorage.setItem("api-token", result.data.token);

      navigate("/dashboard/app", { replace: true });
    } else {
      setError(result.status);
      setShowError(true);
      formik.setSubmitting(false);
    }
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("description.loginFormValidEmail"))
      .required(t("description.loginFormRequiredEmail")),
    password: Yup.string().required(t("description.loginFormRequiredPass")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      loginUser();
    },
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ outlineColor: "#495676" }}>
          {showError ? (
            <div
              style={{
                color: "red",
                border: "1px solid red",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          ) : (
            ""
          )}
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t("description.loginFormEmail")}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            sx={{
              "& .MuiFormHelperText-root": {
                textAlign: i18n.dir() === "ltr" ? "left" : "right",
              },
            }}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label={t("description.loginFormPass")}
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            sx={{
              "& .MuiFormHelperText-root": {
                textAlign: i18n.dir() === "ltr" ? "left" : "right",
              },
              "& .MuiOutlinedInput-root": {
                flexDirection: i18n.dir() === "ltr" ? "row" : "row-reverse",
              },
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Link
            component={RouterLink}
            variant="subtitle2"
            to="#"
            underline="hover"
            style={{
              color: "#495676",
            }}
          >
            {t("description.loginFormForgetPass")}
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          style={{
            backgroundColor: "#EBA26B",
          }}
        >
          {t("description.loginFormLoginButton")}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
