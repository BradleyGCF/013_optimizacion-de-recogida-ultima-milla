import * as React from "react";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { LoginScheme } from "@/schemas/index";
import {
  Box,
  FormControl,
  FormHelperText,
  Typography,
  InputBase,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
} from "@mui/material";
import BackgroundImg from "../assets/Img/svg/background-init.svg";

import ButtonPrimary from "@/components/buttons/button-primary";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CustomStyledInput = styled(InputBase)({
  padding: "2px 12px",
  borderRadius: "10px",
  width: "100%",
  outline: "2px solid #0062BC",
  ".MuiInputBase-input": {
    color: "text.primary",
  },
});

function StyledBoxContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
}

function StyledContainer() {
  return {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
}

function StyledForm() {
  return {
    borderRadius: "10px",
    width: { xs: "300px", sm: "450px", xl: "500px" },
    p: "30px",
    boxShadow: "-2px 11px 18px #0062bc38",
    backgroundColor: "#fff",
  };
}

export default function SignIn() {
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginScheme,
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values));
      resetForm();
    },
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <Box sx={StyledContainer}>
      <Box sx={StyledForm}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              gap: "40px",
            }}
          >
            <FormControl sx={StyledBoxContainer}>
              <Typography variant="h4" color="text.primary">
                Email
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                name="email"
                autoComplete="email"
              />
              {formik.touched.email && (
                <FormHelperText
                  error
                  id="email-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={StyledBoxContainer}>
              <Typography variant="h4" color="text.primary">
                Password
              </Typography>
              <CustomStyledInput
                id="password"
                onBlur={formik.handleBlur}
                type={values.showPassword ? "text" : "password"}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                autoComplete="current-password"
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        color: "icon.secondary",
                      }}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && (
                <FormHelperText
                  error
                  id="password-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <ButtonPrimary
              disabled={!(formik.dirty && formik.isValid)}
              width={"100%"}
              type="submit"
            >
              Sign In
            </ButtonPrimary>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
