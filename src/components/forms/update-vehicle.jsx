import React, { useContext, useState, useEffect, useParams } from "react";
import {
  Box,
  Typography,
  CardMedia,
  styled,
  InputBase,
  FormControl,
  FormHelperText,
} from "@mui/material";

import { useFormik } from "formik";
import { EditVehicle } from "@/schemas/index";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import VehiclesImgCreate from "@/assets/Img/png/vehiclesImgCreate.png";
import ButtonPrimary from "@/components/buttons/button-primary";
import { FaPlus } from "react-icons/fa";

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
  p: "30px",
  "&:last-child": {
    paddingBottom: "30px",
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
        height: { xs: "285px", md: "300px", xl: "600px" },
        width: { xs: "290px", sm: "490px", lg: "100%" },
        borderRadius: "20px",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
      }}
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
        <CardMedia
          title="vehicles Img Create"
          image={VehiclesImgCreate}
          sx={{
            // backgroundSize: { xs: "contain", md: "cover" },
            backgroundSize: "contain",
            objectFit: "cover",
            height: { xs: "285px", md: "300px", xl: "600px" },
            width: { xs: "290px", sm: "490px", lg: "100%" },
            flex: 1,
          }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          width: "fit-content",
          height: "fit-content",
          position: "absolute",
          right: "0px",
          top: "0px",
        }}
      >
        <ModeEditIcon
          fontSize="medium"
          onClick={onImageClickNft}
          sx={{
            color: "background.paper",
            borderRadius: "100%",
          }}
        />
      </Box>
    </Box>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function UpdateVehicle(props) {
  const [branchOffices, setBranchOffices] = useState([""]); 
  const { UpdateVehicle } = useContext(VehiclesContext);
  const [initialState, setInitialState] = useState(null);


  useEffect(() => {
   setInitialState({model: "fiat"});
    
  }, []);


if (!initialState) {
    return <div>Loading...</div>;
  }

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: values => {
      console.log('Form data', values);
    }
  });

  // const formik = useFormik({
  //   initialValues: {
  //     objectId: "",
  //     model: "",
  //     fileigmvehicles: "",
  //     ability: "",
  //     vehicleregistration: "",
  //     mileage: "",
  //     drivers: "",
  //     vehiclegps: [""],
  //     branches: [""],
  //   },
  //   validationSchema: EditVehicle,
  //   onSubmit: async (values, { setSubmitting, resetForm }) => {
  //     const objectId = values.objectId;
  //     await UpdateVehicle(objectId, values);
  //     console.log(JSON.stringify(values));
  //     resetForm();
  //     setSubmitting(false);
  //   },
  // });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // useEffect(() => {
  //   if (props.GetDataVehicle) {
  //     const {
  //       objectId,
  //       model,
  //       fileigmvehicles,
  //       ability,
  //       vehicleregistration,
  //       mileage,
  //       drivers,
  //       vehiclegps,
  //       branches,
  //     } = props.GetDataVehicle;

  //     formik.setValues({
  //       objectId: objectId || "",
  //       model: model || "",
  //       fileigmvehicles: fileigmvehicles || "",
  //       ability: ability || "",
  //       vehicleregistration: vehicleregistration || "",
  //       mileage: mileage || "",
  //       drivers: drivers || "",
  //       vehiclegps: vehiclegps || [""],
  //       branches: branches || [""],
  //     });

  //     setBranchOffices(branches || [""]);
  //   }
  // }, [props.GetDataVehicle]);

  // console.log({ "data props": props.GetDataVehicle });

  // const handleAddBranchOffice = () => {
  //   if (branchOffices.length < 3) {
  //     const newBranchOffices = [...branchOffices, ""];
  //     setBranchOffices(newBranchOffices);
  //     // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  //     formik.setFieldValue(`branches`, newBranchOffices);
  //   }
  // };

  // const handleBranchOfficeChange = (index, value) => {
  //   const newBranchOffices = [...branchOffices];
  //   newBranchOffices[index] = value;
  //   setBranchOffices(newBranchOffices);
  //   formik.setFieldValue(`branches[${index}]`, value);
  // };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Typography variant="subtitle1" color="text.fourth">
          {/* biome-ignore lint/style/noUnusedTemplateLiteral: <explanation> */}
          {props.tilte ? `Vehicle` : ` Register Vehicles`}
        </Typography>
        <Box sx={styleForm}>
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flex: "1",
              flexDirection: "column",
              gap: "10px",
              alignSelf: { xs: "center", lg: "start" },
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
                Model
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={formik.touched.model && Boolean(formik.errors.model)}
                onChange={formik.handleChange}
                value={formik.values.model}
                id="model"
                name="model"
                autoComplete="model"
                defaultValue={formik.values.model || ""}
              />
              {formik.touched.model && (
                <FormHelperText
                  error
                  id="model-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.model}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={StyledFormControl}>
              <Typography variant="h4" color="text.fourth">
                Ability
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={formik.touched.ability && Boolean(formik.errors.ability)}
                onChange={formik.handleChange}
                value={formik.values.ability}
                id="ability"
                name="ability"
                autoComplete="ability"
                placeholder={formik.values.ability || "Ability"}
              />
              {formik.touched.ability && (
                <FormHelperText
                  error
                  id="ability-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.ability}
                </FormHelperText>
              )}
            </FormControl>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl sx={StyledFormControl}>
                <Typography variant="h4" color="text.fourth">
                  Vehicle Registration
                </Typography>
                <CustomStyledInput
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.vehicleregistration &&
                    Boolean(formik.errors.vehicleregistration)
                  }
                  onChange={formik.handleChange}
                  value={formik.values.vehicleregistration}
                  id="vehicleregistration"
                  name="vehicleregistration"
                  autoComplete="vehicleregistration"
                  placeholder={
                    formik.values.vehicleregistration || "Vehicle Registration"
                  }
                />
                {formik.touched.vehicleregistration && (
                  <FormHelperText
                    error
                    id="vehicleregistration-error"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.vehicleregistration}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={StyledFormControl}>
                <Typography variant="h4" color="text.fourth">
                  Mileage
                </Typography>
                <CustomStyledInput
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mileage && Boolean(formik.errors.mileage)
                  }
                  onChange={formik.handleChange}
                  value={formik.values.mileage}
                  id="mileage"
                  name="mileage"
                  autoComplete="mileage"
                  placeholder={formik.values.mileage || "Mileage"}
                />
                {formik.touched.mileage && (
                  <FormHelperText
                    error
                    id="mileage-error"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.mileage}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <FormControl sx={StyledFormControl}>
              <Typography variant="h4" color="text.fourth">
                Driver or Drivers
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={formik.touched.drivers && Boolean(formik.errors.drivers)}
                onChange={formik.handleChange}
                value={formik.values.drivers}
                id="drivers"
                name="drivers"
                autoComplete="drivers"
                placeholder={formik.values.drivers || "Driver or Drivers"}
              />
              {formik.touched.drivers && (
                <FormHelperText
                  error
                  id="drivers-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.drivers}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={StyledFormControl}>
              <Typography variant="h4" color="text.fourth">
                Vehicle GPS
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={
                  formik.touched.vehiclegps && Boolean(formik.errors.vehiclegps)
                }
                onChange={formik.handleChange}
                value={formik.values.vehiclegps}
                id="vehiclegps"
                name="vehiclegps"
                autoComplete="vehiclegps"
                placeholder={formik.values.vehiclegps || "Vehicle GPS"}
              />
              {formik.touched.vehiclegps && (
                <FormHelperText
                  error
                  id="vehiclegps-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.vehiclegps}
                </FormHelperText>
              )}
            </FormControl>
            <Box sx={StyledFormControl}>
              {branchOffices.map((branch, index) => (
                <CustomStyledInput
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.branches && Boolean(formik.errors.branches)
                  }
                  onChange={(event) =>
                    handleBranchOfficeChange(index, event.target.value)
                  }
                  value={branch}
                  id={`branches[${index}]`}
                  name={`branches[${index}]`}
                  autoComplete={`branches[${index}]`}
                />
              ))}
              {branchOffices.length < 3 && (
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <ButtonPrimary
                    onClick={handleAddBranchOffice}
                    type="button"
                    variant="contained"
                    disabled={branchOffices.length >= 3}
                  >
                    Add branch office
                  </ButtonPrimary>
                </Box>
              )}
            </Box>
            {formik.touched.branches && (
              <FormHelperText
                error
                id="branches-error"
                sx={{ textAlign: "center" }}
              >
                {formik.errors.branches}
              </FormHelperText>
            )}

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ButtonPrimary
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Updating..." : "Update vehicle"}
              </ButtonPrimary>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default UpdateVehicle;
