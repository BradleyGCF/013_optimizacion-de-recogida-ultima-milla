import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import {
  Box,
  FormControl,
  FormHelperText,
  Typography,
  InputBase,
  Stack,
} from "@mui/material";
import ButtonPrimary from "@/components/buttons/button-primary";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AuthImg from '@/assets/Img/png/authbg.png'
import { useNavigate } from "react-router-dom";

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
    width: "100%"
  };
}

function StyledForm() {
  return {
    borderRadius: "10px",
    width: { xs: "300px", sm: "450px", xl: "500px" },
    p: "30px",
    boxShadow: "-2px 11px 18px #0062bc38",
    backgroundColor: "#fff",
    position: "relative"
  };
}

function FontStyle(size: any, weight: any) {
  return {
    fontFamily: "Jost",
    fontSize: `${size}px`,
    fontWeight: `${weight}`,
    color: "#00294F"
  }
}

const EmailScheme = yup.object().shape({
  email: yup
    .string()
    .max(255)
    .required("Email is required")
    .matches(/^[^@]+@[^@]+\.[^@]+$/, "Email must contain '@' before '.'"),
})

export default function RecoverPassword() {

  const [sended, setSended] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: EmailScheme,
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values));
      resetForm();
    },
  });

  const nav = useNavigate()

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
        }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            background: "#0062BC",
            mixBlendMode: "multiply",
            zIndex: -2
          }}
        />
      </Box>
      
      <Box sx={StyledForm}>

        { sended ? 
        <Box display="flex" flexDirection="column" gap="24px" alignItems="center" marginY={8}>
          <Stack direction="row" spacing="8px">
            <CheckCircleOutlineIcon/>
            <Typography sx={FontStyle(16, 700)}>Email sended</Typography>
          </Stack>
          <Typography sx={FontStyle(12, 400)}>Check your email box to recover your password</Typography>
          <ButtonPrimary width="100%" onClick={() => nav("/sign-in")}> Back to login </ButtonPrimary>
        </Box> 
        :
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              <Stack direction="row" spacing={1}>
                <ErrorOutlineIcon sx={{ width: "23px", height: "23px", color: "#00294F" }} />
                <Typography sx={FontStyle(16, 700)}>Recover password</Typography>
              </Stack>

              <Typography sx={FontStyle(12, 400)}> Enter your email address to recover your password </Typography>
            </Box>

            <FormControl sx={StyledBoxContainer}>
              <Typography component="h4" sx={FontStyle(25, 400)}>
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

            <ButtonPrimary
              disabled={!(formik.dirty && formik.isValid)}
              width={"100%"}
              type="submit"
              onClick={() => setSended(true)}
            >
              Send
            </ButtonPrimary>

          </Box>
        </form> }
      </Box>
    </Box>
  );
}
