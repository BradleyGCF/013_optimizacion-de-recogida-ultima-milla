import * as React from "react";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import { LoginScheme } from "@/schemas/LoginScheme";
import {
  Box,
  FormControl,
  FormHelperText,
  Typography,
  InputBase,
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useBoundStore } from "@/stores/index";
import ButtonPrimary from "@/components/buttons/button-primary";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";

import AuthImg from "@/assets/Img/png/authbg.png";
import { useNavigate } from "react-router-dom";

import CarouselPreference from "@/components/carousel/carousel-preference";

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
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
  };
}

function StyledForm() {
  return {
    borderRadius: "10px",
    width: { xs: "300px", sm: "450px", xl: "500px" },
    p: "30px",
    boxShadow: "-2px 11px 18px #0062bc38",
    backgroundColor: "#fff",
    position: "relative",
  };
}

function FontStyle(size: any, weight: any) {
  return {
    fontFamily: "Jost",
    fontSize: `${size}px`,
    fontWeight: `${weight}`,
  };
}

export default function SignIn() {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const nav = useNavigate();

  const { Authenticated, setAuthenticated } = useBoundStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginScheme,
    onSubmit: (values, { resetForm }) => {
      try {
        console.log(JSON.stringify(values));
        resetForm();
        nav("/dashboard");
      } catch (error) {
        console.log("Error login admin");
      }
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
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${AuthImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            background: "#0062BC",
            mixBlendMode: "multiply",
            zIndex: -2,
          }}
        />
      </Box>
      <Box sx={StyledForm}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Stack direction="row" spacing={1}>
              <PersonIcon sx={{ height: "16px" }} />
              <Typography sx={{ "&.MuiTypography-root": { fontSize: "12px" } }}>
                Sign in
              </Typography>
            </Stack>

            <FormControl sx={StyledBoxContainer}>
              <Typography component="h4" sx={FontStyle(25, 400)}>
                Admin
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
              <Typography component="h4" sx={FontStyle(25, 400)}>
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
            <Box
              sx={{
                paddingTop: "1rem",
              }}
            >
              <ButtonPrimary
                disabled={!(formik.dirty && formik.isValid)}
                width={"100%"}
                type="submit"
              >
                Sign In
              </ButtonPrimary>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
