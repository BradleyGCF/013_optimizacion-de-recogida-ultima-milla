import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  TextField,
  Button,
} from "@mui/material";
import ButtonPrimary from "@/components/buttons/button-primary";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useBoundStore } from "@/stores/index";
import { useFormik } from "formik";
import { createNewRouteScheme } from "@/schemas/index";
import { useContext, useState, useEffect } from "react";
import { RouteContext } from "@/context/Route/RouteContext";
import { BranchContext } from "../../context/Branch/BranchContext";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import Swal from "sweetalert2";
export default function RegisterNewRoute() {
  const theme = useTheme();
  const { createNewRoute } = useContext(RouteContext);
  const { getAllBranch } = useContext(BranchContext);

  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [info, setInfo] = useState([null, null]);
  const { DataPerfilBranch, DataPerfilVehicles } = useBoundStore();
  const [vehicleSelect, setVehicleSelect] = useState([]);
  const { getAllVehicles } = useContext(VehiclesContext);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const allBranches = async () => await getAllBranch();
    allBranches();
    const allVehicles = async () => await getAllVehicles(1);
    allVehicles();
    console.log(DataPerfilBranch, DataPerfilVehicles);
  }, []);

  useEffect(() => {
    if (DataPerfilBranch) {
      console.log(DataPerfilBranch);
    }
  }, [DataPerfilBranch]);

  const formik = useFormik({
    initialValues: {
      startingPoint: {
        lat: 0,
        lon: 0,
      },
      endingPoint: {
        lat: 0,
        lon: 0,
      },
      startingName: "",
      endingName: "",
      vehicle: "",
      branches: [],
    },
    validationSchema: createNewRouteScheme,
    onSubmit: async (values, { resetForm }) => {
      const response = await createNewRoute(values);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "route successfully created ",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleStartLocationChange = (event) => {
    const value = event.target.value;
    setStartLocation(value);
    formik.setFieldValue("startingName", value);

    if (value === "") {
      formik.setFieldValue("startingPoint", { lat: 0, lon: 0 });
      setInfo((prevInfo) => {
        const newInfo = [...prevInfo];
        newInfo[0] = null;
        return newInfo;
      });
    }
  };

  const handleEndLocationChange = (event) => {
    const value = event.target.value;
    setEndLocation(value);
    console.log({ value });
    formik.setFieldValue("endingName", value);

    if (value === "") {
      formik.setFieldValue("endingPoint", { lat: 0, lon: 0 });
      setInfo((prevInfo) => {
        const newInfo = [...prevInfo];
        newInfo[1] = null;
        return newInfo;
      });
    }
  };

  const fetchCoordinates = async (location, setField, setNameField, index) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      formik.setFieldValue(setField, { lat, lon });
      formik.setFieldValue(setNameField, display_name);
      setInfo((prevInfo) => {
        const newInfo = [...prevInfo];
        newInfo[index] = { location, display_name };
        return newInfo;
      });
    } else {
      formik.setFieldValue(setField, { lat: 0, lon: 0 });
    }
  };

  const handleFindCoordinates = () => {
    fetchCoordinates(startLocation, "startingPoint", "startingName", 0);
    fetchCoordinates(endLocation, "endingPoint", "endingName", 1);
  };

  const StyledForm = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    mb: 3,
  };

  const StyledSelect = {
    padding: "8px 16px",
    borderRadius: "10px",
    width: "100%",
    background: "#FFF",
    boxShadow: "0px 25px 30px 0px rgba(0, 98, 188, 0.15)",
    height: "39px",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      display: "none",
    },
  };

  const styledTextField = {
    "& .MuiInputBase-root": {
      height: "39px",
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      borderRadius: "10px",
      background: "#FFF",
      boxShadow: "0px 25px 30px 0px rgba(0, 98, 188, 0.15)",
      border: "0px",
    },
    ".MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      boxShadow: "none",
    },
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  function getStyles(branch, branches, theme) {
    return {
      fontWeight:
        branches.indexOf(branch) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightBold,
    };
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="subtitle1" color="text.fourth">
        <h3>Register New Route</h3>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "center" },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Starting point
          </Typography>
          <FormControl sx={StyledForm} variant="standard">
            <TextField
              sx={styledTextField}
              fullWidth
              id="startingName"
              name="startingName"
              value={formik.values.startingName}
              onChange={handleStartLocationChange}
              onBlur={formik.handleBlur}
              margin="normal"
            />
            <Typography>{info[0]?.display_name}</Typography>
            {formik.touched.startingName && formik.errors.startingName && (
              <FormHelperText error id="starting-error">
                {formik.errors.startingName}
              </FormHelperText>
            )}
          </FormControl>

          <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Ending point
          </Typography>
          <FormControl sx={StyledForm} variant="standard">
            <TextField
              sx={styledTextField}
              fullWidth
              id="endingName"
              name="endingName"
              value={formik.values.endingName}
              onChange={handleEndLocationChange}
              onBlur={formik.handleBlur}
              margin="normal"
            />
            <Typography>{info[1]?.display_name}</Typography>
            {formik.touched.endingName && formik.errors.endingName && (
              <FormHelperText error id="ending-error">
                {formik.errors.endingName}
              </FormHelperText>
            )}
          </FormControl>

          <Box marginBottom={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFindCoordinates}
            >
              Find Coordinates
            </Button>
          </Box>

          <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Vehicle
          </Typography>
          <FormControl sx={StyledForm} variant="standard">
            <Select
              value={formik.values.vehicle}
              onChange={(event) =>
                formik.setFieldValue("vehicle", event.target.value)
              }
              onBlur={formik.handleBlur("vehicle")}
              sx={StyledSelect}
              name="Vehicle"
              id="Vehicle"
              disableUnderline
              inputProps={{
                MenuProps: {
                  sx: {
                    "&& .Mui-selected": {
                      backgroundColor: "white",
                    },
                    "&& .MuiList-root": {
                      backgroundColor: "white",
                    },
                  },
                },
              }}
            >
              {DataPerfilVehicles?.map((vehicle) => (
                <MenuItem key={vehicle?.id} value={vehicle?.id}>
                  {vehicle?.attributes?.model}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.vehicle && formik.errors.vehicle && (
              <FormHelperText error id="vehicle-error">
                {formik.errors.vehicle}
              </FormHelperText>
            )}
          </FormControl>

          <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Select branches
          </Typography>
          <FormControl sx={StyledForm}>
            <Select
              value={formik.values.branches}
              onBlur={formik.handleBlur("branches")}
              sx={StyledSelect}
              multiple
              name="SelectBranches"
              id="SelectBranches"
              onChange={(event) =>
                formik.setFieldValue("branches", event.target.value)
              }
              disableUnderline
              inputProps={{
                MenuProps: {
                  sx: {
                    "&& .Mui-selected": {
                      backgroundColor: "white",
                    },
                    "&& .MuiList-root": {
                      backgroundColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-root": {
                      borderColor: "red",
                    },
                  },
                },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                  },
                },
              }}
            >
              {DataPerfilBranch?.map((branch, index) => (
                <MenuItem
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  style={getStyles(
                    branch.attributes.name,
                    formik.values.branches,
                    theme
                  )}
                  value={branch.id}
                >
                  {branch.attributes.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.branches && formik.errors.branches && (
              <FormHelperText error id="branches-error">
                {formik.errors.branches}
              </FormHelperText>
            )}
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ButtonPrimary
              width="80%"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              To register
            </ButtonPrimary>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
