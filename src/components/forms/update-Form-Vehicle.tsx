import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  CardMedia,
  styled,
  InputBase,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useFormik } from "formik";
import { EditVehicle } from "@/schemas/index";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import VehiclesImgCreate from "@/assets/Img/png/vehiclesImgCreate.png";
import ButtonPrimary from "@/components/buttons/button-primary";
import { FaPlus } from "react-icons/fa";
import { useBoundStore } from "@/stores/index";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "@/context/User/UserContext";
import { BranchContext } from "@/context/Branch/BranchContext";
import { LuPlusSquare } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";

const CustomStyledSelect = styled(Select)({
  borderRadius: "10px",
  background: "#FFF",
  boxShadow:
    "0px 2.76726px 2.21381px 0px rgba(0, 98, 188, 0.02), 0px 6.6501px 5.32008px 0px rgba(0, 98, 188, 0.03), 0px 12.52155px 10.01724px 0px rgba(0, 98, 188, 0.04), 0px 22.33631px 17.86905px 0px rgba(0, 98, 188, 0.04), 0px 41.77761px 33.42209px 0px rgba(0, 98, 188, 0.05), 0px 100px 80px 0px rgba(0, 98, 188, 0.07)",

  width: "100%",
  ".MuiSelect-select": {
    color: "text.primary",
    padding: "9px 9px",
  },
  ".MuiButtonBase-root": {
    color: "#fce4ec",
  },
});

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

const CustomStyledElemet = styled(InputBase)({
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

interface IElement {
  value: string;
  id: string;
}

const ArrayFormElement = ({
  type,
  data,
  updateElementArray,
}: {
  type: string;
  data: { id: string }[];
  updateElementArray: any;
}) => {
  const { GetAllUser } = useContext(UserContext);
  const { getAllBranchToVehicleUpdate } = useContext(BranchContext);

  const { AllUser, Branch } = useBoundStore();

  const [element, setElement] = useState<IElement[]>([]);
  const [newElement, setNewElement] = useState<IElement | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);

  const handleChange = (event) => {
    if (type === "drivers") {
      const userDrivers = AllUser.filter(
        (user) => user?.id === event.target.value
      );
      setNewElement({
        value: userDrivers?.[0]?.attributes?.username,
        id: event.target.value,
      });
    }
    if (type === "branches") {
      const selectBranch = Branch.filter(
        (branch) => branch?.id === event.target.value
      );
      setNewElement({
        value: selectBranch?.[0]?.attributes?.name,
        id: event.target.value,
      });
    }
    setSelectedOption(event.target.value);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (type === "drivers") {
      GetAllUser();
    }
    if (type === "branches") {
      getAllBranchToVehicleUpdate();
    }
  }, [type]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (data && AllUser && type === "drivers") {
      const driversIds = data.map((driver) => driver?.id);
      const userDrivers = AllUser?.filter((user) =>
        driversIds.includes(user?.id)
      ).map((user) => {
        return {
          value: user?.attributes.username,
          id: user?.id,
        };
      });
      setElement(userDrivers);

      const UserOptions = AllUser?.filter(
        (user) => !driversIds.includes(user?.id)
      ).map((user) => {
        return {
          value: user?.attributes.username,
          id: user?.id,
        };
      });
      setOptions(UserOptions);
    }
    if (data && Branch && type === "branches") {
      const branchesIds = data.map((branch) => branch?.id);
      const Branches = Branch?.filter((branch) =>
        branchesIds.includes(branch?.id)
      ).map((branch) => {
        return {
          value: branch?.attributes.name,
          id: branch?.id,
        };
      });
      setElement(Branches);

      const BrachesOptions = Branch?.filter(
        (branch) => !branchesIds.includes(branch?.id)
      ).map((branch) => {
        return {
          value: branch?.attributes.name,
          id: branch?.id,
        };
      });
      setOptions(BrachesOptions);
    }
  }, [data, AllUser, Branch]);

  const onDelete = (id: string) => {
    const elementDeleted = element?.filter((d) => d.id === id);
    const newData = element?.filter((d) => d.id !== id);
    setElement(newData);
    setOptions(options.concat(elementDeleted));
  };

  const onAdd = () => {
    if (newElement) {
      const newData = element.concat(newElement);
      updateElementArray({ [type]: newData });
      setElement(newData);
      setSelectedOption("");
      setOptions(options.filter((option) => option?.id !== newElement?.id));
      setNewElement(null);
    }
  };

  return (
    <FormControl sx={StyledFormControl}>
      <Typography variant="h4" color="text.fourth">
        {type}
      </Typography>
      {element?.map((elem) => {
        return (
          <Grid container spacing={2} key={elem.id}>
            <Grid item xs={11}>
              <CustomStyledElemet
                id={elem.id}
                name={elem.id}
                autoComplete={elem.id}
                placeholder={elem.value}
                disabled={true}
                value={elem.value}
              />
            </Grid>
            <Grid item xs={1} onClick={() => onDelete(elem.id)}>
              <MdOutlineDeleteOutline
                style={{
                  cursor: "pointer",
                  marginTop: "0.70rem",
                  fontSize: "1.2rem",
                  color: "#00294F",
                }}
              />
            </Grid>
          </Grid>
        );
      })}
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <FormControl sx={StyledFormControl}>
            <InputLabel id="select-label">{`Insertar nuevo ${type}`}</InputLabel>
            <CustomStyledSelect
              labelId="select-label"
              id="mileage"
              name="mileage"
              value={selectedOption}
              onChange={handleChange}
              autoComplete="mileage"
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#e0e0e0",
                    color: "#000",
                  },
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </CustomStyledSelect>
          </FormControl>
        </Grid>
        <Grid
          className="flex justify-center align-items-center"
          item
          xs={1}
          onClick={() => onAdd()}
          style={{ cursor: "pointer" }}
        >
          <LuPlusSquare
            style={{
              marginTop: "0.70rem",
              fontSize: "1.2rem",
              color: "#00294F",
            }}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};

const objStateInitial = {
  objectId: "",
  model: "",
  fileigmvehicles: "",
  capacity: "",
  plate: "",
  mileage: "",
  drivers: [],
  gps: "",
  branches: [],
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const UpdateFormVehicle = (props: any) => {
  const { IdGetVehicle, UpdateVehicle } = useContext(VehiclesContext);

  const { GetDataVehicle } = useBoundStore();
  const [initialValues, setInitialValues] = useState(objStateInitial);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [finishUpdate, setFinishUpdate] = useState(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (id && finishUpdate) {
      IdGetVehicle(id);
    }
  }, [id, finishUpdate]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (GetDataVehicle.length) {
      const dataVehicle = GetDataVehicle?.[0]?.attributes;
      const formatDataVehicle = {
        ...objStateInitial,
        model: dataVehicle.model,
        capacity: dataVehicle.capacity,
        plate: dataVehicle.plate,
        mileage: dataVehicle.mileage,
        gps: dataVehicle.gps,
        drivers: dataVehicle.drivers,
        branches: dataVehicle.branches,
        objectId: id,
      };
      setInitialValues(formatDataVehicle);
      setIsLoading(false);
    }
  }, [GetDataVehicle]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setFinishUpdate(true);
      const formatDriver = values.drivers?.map((value: { id: string }) => {
        return {
          __type: "Pointer",
          className: "_User",
          objectId: value.id,
        };
      });

      const formatBranches = values.branches?.map((value: { id: string }) => {
        return {
          __type: "Pointer",
          className: "branch",
          objectId: value.id,
        };
      });
      UpdateVehicle(id, {
        ...values,
        drivers: formatDriver,
        branches: formatBranches,
      });
      setFinishUpdate(true);
      Swal.fire({
        icon: "success",
        title: "updated vehicle",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const updateElementArray = (data: any) => {
    console.log({
      ...formik.values,
      ...data,
    });
    formik.setValues({
      ...formik.values,
      ...data,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
              onChangeImageNft={(fileigmvehicles: string) =>
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
                error={
                  formik.touched.capacity && Boolean(formik.errors.capacity)
                }
                onChange={formik.handleChange}
                value={formik.values.capacity}
                id="capacity"
                name="capacity"
                autoComplete="capacity"
                placeholder={formik.values.capacity || "capacity"}
              />
              {formik.touched.capacity && (
                <FormHelperText
                  error
                  id="capacity-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.capacity}
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
                  Plate
                </Typography>
                <CustomStyledInput
                  onBlur={formik.handleBlur}
                  error={formik.touched.plate && Boolean(formik.errors.plate)}
                  onChange={formik.handleChange}
                  value={formik.values.plate}
                  id="plate"
                  name="plate"
                  autoComplete="plate"
                  placeholder={formik.values.plate || "plate "}
                />
                {formik.touched.plate && (
                  <FormHelperText
                    error
                    id="plate-error"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.plate}
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
            <ArrayFormElement
              type="drivers"
              data={initialValues?.drivers}
              updateElementArray={updateElementArray}
            />
            <FormControl sx={StyledFormControl}>
              <Typography variant="h4" color="text.fourth">
                Vehicle GPS
              </Typography>
              <CustomStyledInput
                onBlur={formik.handleBlur}
                error={formik.touched.gps && Boolean(formik.errors.gps)}
                onChange={formik.handleChange}
                value={formik.values.gps}
                id="gps"
                name="gps"
                autoComplete="gps"
                placeholder={formik.values.gps || "Vehicle GPS"}
              />
              {formik.touched.gps && (
                <FormHelperText
                  error
                  id="gps-error"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {formik.errors.gps}
                </FormHelperText>
              )}
            </FormControl>
            <ArrayFormElement
              type="branches"
              data={initialValues?.branches}
              updateElementArray={updateElementArray}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ButtonPrimary
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {finishUpdate === false ? "Updating..." : "Update vehicle"}
              </ButtonPrimary>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default UpdateFormVehicle;
