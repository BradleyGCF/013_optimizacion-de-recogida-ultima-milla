import * as React from "react";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import { toast } from "react-hot-toast";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ButtonPrimary from "@/components/buttons/button-primary";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import AuthImg from "@/assets/Img/png/authbg.png";
import { useNavigate } from "react-router-dom";

import CarouselPreference from "@/components/carousel/carousel-preference";
import { UserContext } from "@/context/User/UserContext";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";

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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function FontStyle(size: any, weight: any) {
  return {
    fontFamily: "Jost",
    fontSize: `${size}px`,
    fontWeight: `${weight}`,
  };
}

export default function SignIn() {
  const navigate = useNavigate();
  const [response, setResponse] = React.useState(false);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { Authenticated, Admin, setAdmin } = useBoundStore(
    (state: any) => state,
    shallow
  );

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { LoginMail }: any = React.useContext(UserContext);
  const { LoginVehicles }: any = React.useContext(VehiclesContext);
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginScheme,
    onSubmit: async (values, { resetForm }) => {
      try {
        var res;
        if (Admin) {
          res = await LoginMail(values);
        } else if (!Admin) {
          res = await LoginVehicles(values);
        }
        if (res?.ok) {
          if (res?.admin === "admin") {
            navigate("/dashboard");
          }
          resetForm();
          toast.success("¡Bienvenido!", {
            duration: 2000,
            position: "top-center",
          });
          resetForm();
        } else {
          toast.error("Username o contraseña incorrecto, vuleve a intentarlo", {
            duration: 4000,
            position: "top-center",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Algo salio mal, vuelve a intentarlo", {
          duration: 3000,
          position: "top-center",
        });
      }
      return;
    },
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const nav = useNavigate();

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

      {Authenticated !== false && response ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
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
                  <Typography
                    sx={{ "&.MuiTypography-root": { fontSize: "12px" } }}
                  >
                    Sign in
                  </Typography>
                </Stack>

                <FormControl sx={StyledBoxContainer}>
                  <Typography component="h4" sx={FontStyle(25, 400)}>
                    {!Admin ? "Plate" : "Admin"}
                  </Typography>
                  <CustomStyledInput
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    id="username"
                    name="username"
                    autoComplete="username"
                  />
                  {formik.touched.username && (
                    <FormHelperText
                      error
                      id="username-error"
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {formik.errors.username}
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
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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

                {!Admin ? (
                  <Stack spacing={0.3} direction="row" alignItems="center">
                    <Checkbox
                      sx={{
                        heigth: "15px",
                        color: "#0062BC",
                        "&.Mui-checked": {
                          color: "#0062BC",
                        },
                        "& .MuiSvgIcon-root": { fontSize: 15 },
                      }}
                    />
                    <Typography sx={FontStyle(16, 500)}>Remember me</Typography>
                  </Stack>
                ) : null}

                {!Admin ? (
                  <Box display="flex" justifyContent="center">
                    <Typography
                      sx={{
                        "&.MuiTypography-root": {
                          // fontSize: "10px !important",
                          fontWeight: 700,
                          fontFamily: "Jost",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => nav("/recover-password")}
                    >
                      Forgot password?
                    </Typography>
                  </Box>
                ) : null}

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
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "flex-end",
              pr: { xs: 0, md: "1rem" },
              justifyContent: "center",
            }}
          >
            {Admin ? (
              <LockOpenIcon
                fontSize="large"
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => setAdmin(false)}
              />
            ) : (
              <LockOutlinedIcon
                fontSize="large"
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => setAdmin(true)}
              />
            )}
          </Box>
        </Box>
      ) : (
        <CarouselPreference />
      )}
    </Box>
  );
}
