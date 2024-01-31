import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  CardMedia,
  styled,
  InputBase,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useFormik } from "formik";
import { EditBranchOffice } from "@/schemas/index";
import ButtonPrimary from "@/components/buttons/button-primary";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
const CustomStyledInput = styled(InputBase)({
  borderRadius: "10px",
  background: "#FFF",
  boxShadow:
    "0px 2.76726px 2.21381px 0px rgba(0, 98, 188, 0.02), 0px 6.6501px 5.32008px 0px rgba(0, 98, 188, 0.03), 0px 12.52155px 10.01724px 0px rgba(0, 98, 188, 0.04), 0px 22.33631px 17.86905px 0px rgba(0, 98, 188, 0.04), 0px 41.77761px 33.42209px 0px rgba(0, 98, 188, 0.05), 0px 100px 80px 0px rgba(0, 98, 188, 0.07)",
  padding: "2px 12px",
  width: "100%",
  ".MuiInputBase-input": {
    color: "text.primary",
  },
});

const styleForm = {
  height: "100%",
  display: "flex",
  flexDirection: { xs: "column", lg: "row" },
  justifyContent: "center",
  alignItems: "center",
  gap: { xs: "15px", md: "50px" },
  p: { xs: "0px", sm: "30px" },
  "&:last-child": {
    paddingBottom: { xs: "0px", sm: "30px" },
  },
};

function StyledFormControl() {
  return {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    gap: "10px",
  };
}

function ImageInputBanner(props) {
  const [selectedFile, setSelectedFile] = React.useState();
  const inputFile = React.useRef(null);
  const changeHandlerNFt = async (event) => {
    const img = event.target.files[0];
    setSelectedFile(URL.createObjectURL(img));

    try {
      const compressedImage = await imageCompression(img, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
      });

      props.onChangeImageNft(compressedImage);
    } catch (error) {
      return error;
    }
  };

  const onImageClickNft = () => {
    inputFile.current.click();
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: { xs: "285px", md: "300px", xl: "500px" },
        width: { xs: "100%", sm: "490px", lg: "100%" },
        borderRadius: "20px",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        backgroundColor: "background.paper",
      }}
      onClick={onImageClickNft}
    >
      <input
        type="file"
        name="file"
        ref={inputFile}
        onChange={changeHandlerNFt}
        style={{ display: "none" }}
      />
      {selectedFile ? (
        <CardMedia
          component="img"
          image={selectedFile}
          alt="image company"
          sx={{
            borderRadius: "20px",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <Box>
          <AddPhotoAlternateOutlinedIcon
            sx={{
              color: "background.default",
              fontSize: "80px",
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default function RegisterBranchOfficeProfile(props) {
  const formik = useFormik({
    initialValues: {
      fileigmbranchoffice: "",
      fullname: "",
      address: "",
      country: "",
      city: "",
      manager: "",
    },
    validationSchema: EditBranchOffice,
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Box sx={styleForm}>
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flex: "1",
              flexDirection: "column",
              gap: "10px",
              alignSelf: { xs: "center", lg: "start" },
              width: "100%",
            }}
          >
            <ImageInputBanner
              onChangeImageNft={(fileigmvehicles) =>
                formik.setFieldValue("fileigmvehicles", fileigmvehicles)
              }
            />
          </FormControl>
          <Box sx={StyledFormControl}>
            <FormControl sx={StyledFormControl}>
              <Typography variant="h4" color="text.fourth">
                Full Name
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                onChange={formik.handleChange}
                value={formik.values.fullname}
                id="fullname"
                name="fullname"
                autoComplete="fullname"
              />
              {formik.touched.fullname && (
                <FormHelperText
                  error
                  id="fullname-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.fullname}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={StyledFormControl}>
              <Typography variant="h4" color="text.fourth">
                Address
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                onChange={formik.handleChange}
                value={formik.values.address}
                id="address"
                name="address"
                autoComplete="address"
                endAdornment={
                  <InputAdornment position="end">
                    <LocationOnIcon sx={{ color: "background.paper" }} />
                  </InputAdornment>
                }
              />
              {formik.touched.address && (
                <FormHelperText
                  error
                  id="address-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.address}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl sx={StyledFormControl}>
              <Typography variant="h4" color="text.fourth">
                Country
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                onChange={formik.handleChange}
                value={formik.values.country}
                id="country"
                name="country"
                autoComplete="country"
              />
              {formik.touched.country && (
                <FormHelperText
                  error
                  id="country-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.country}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={StyledFormControl}>
              <Typography variant="h4" color="text.fourth">
                City
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                onChange={formik.handleChange}
                value={formik.values.city}
                id="city"
                name="city"
                autoComplete="city"
              />
              {formik.touched.city && (
                <FormHelperText
                  error
                  id="city-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.city}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={StyledFormControl}>
              <Typography variant="h4" color="text.fourth">
                Manager
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={formik.touched.manager && Boolean(formik.errors.manager)}
                onChange={formik.handleChange}
                value={formik.values.manager}
                id="manager"
                name="manager"
                autoComplete="manager"
              />
              {formik.touched.manager && (
                <FormHelperText
                  error
                  id="manager-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.manager}
                </FormHelperText>
              )}
            </FormControl>

            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              type="submit"
            >
              <ButtonPrimary width="100%">Edit</ButtonPrimary>
              <ButtonPrimary width="100%">Delete</ButtonPrimary>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
