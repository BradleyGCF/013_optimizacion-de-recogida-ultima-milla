import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { useFormik } from "formik";
import ButtonPrimary from "@/components/buttons/button-primary";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { InputBase } from "@mui/material";

const CustomInput = styled(InputBase)(() => ({
  padding: "0px 10px 0px 15px",
  borderRadius: "10px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
}));

const settingsSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup
    .string()
    .email("Correo invalido")
    .required("El correo es requerido"),
  user: yup.string().max(1000).required("El usuario es requerida"),
  password: yup.string().max(1000).required("La contraseña es requerida"),
});

export default function Settings() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      user: "",
      password: "",
    },
    validationSchema: settingsSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values));
      resetForm();
    },
  });

  return (
    <Box>
      <Typography color="text.third" fontSize={24} fontWeight={600}>
        Configuración
      </Typography>

      <Box
        sx={{
          maxWidth: "524px",
          margin: "auto",
          mt: 4,
        }}
      >
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack spacing={2}>
            <FormControl
              variant="standard"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h3"
                color="text.secondary"
                sx={{
                  my: "6px",
                  fontWeight: 300,
                }}
              >
                Nombre y Apellido
              </Typography>
              <CustomInput
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                onChange={formik.handleChange}
                value={formik.values.name}
                required
                placeholder="Name"
                id="name"
                name="name"
              />
              {formik.touched.name && (
                <FormHelperText
                  sx={{
                    textAlign: "center",
                  }}
                  error
                  id="name-error"
                >
                  {formik.errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="standard"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h3"
                color="text.secondary"
                sx={{
                  my: "6px",

                  fontWeight: 300,
                }}
              >
                Correo
              </Typography>
              <CustomInput
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                onChange={formik.handleChange}
                value={formik.values.email}
                required
                placeholder="Correo"
                id="email"
                name="email"
                type="email"
              />
              {formik.touched.email && (
                <FormHelperText
                  sx={{
                    textAlign: "center",
                  }}
                  error
                  id="email-error"
                >
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              variant="standard"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h3"
                color="text.secondary"
                sx={{
                  my: "6px",

                  fontWeight: 300,
                }}
              >
                Usuario
              </Typography>
              <CustomInput
                onBlur={formik.handleBlur}
                error={formik.touched.user && Boolean(formik.errors.user)}
                onChange={formik.handleChange}
                value={formik.values.user}
                required
                placeholder="Usuario"
                id="user"
                name="user"
              />
              {formik.touched.user && (
                <FormHelperText
                  sx={{
                    textAlign: "center",
                  }}
                  error
                  id="user-error"
                >
                  {formik.errors.user}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="standard"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h3"
                color="text.secondary"
                sx={{
                  my: "6px",

                  fontWeight: 300,
                }}
              >
                Contraseña
              </Typography>
              <CustomInput
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                onChange={formik.handleChange}
                value={formik.values.password}
                required
                placeholder="Contraseña"
                id="password"
                name="password"
                type="password"
              />
              {formik.touched.password && (
                <FormHelperText
                  sx={{
                    textAlign: "center",
                  }}
                  error
                  id="password-error"
                >
                  {formik.errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <ButtonPrimary type="submit" width={"100%"}>
              Actualizar
            </ButtonPrimary>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
