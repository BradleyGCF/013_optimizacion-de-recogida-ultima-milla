import {
  Modal,
  Box,
  Typography,
  FormControl,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { modalInventoryScheme } from "@/schemas";
import { BranchContext } from "@/context/Branch/BranchContext";
import { InventoryContext } from "@/context/Inventory/InventoryContext";
import { getWeight } from "@/hooks/getWeight";
import calculateVolumetric from "../../utils/calculateVolumetric";
export const styledModal = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "540px",
  minWidth: "310px",
  maxHeight: "710px",
  bgcolor: "#FFF",
  borderRadius: "10px",
  p: "48px 44px",
  gap: "10px",
  overflowY: "scroll",
};

export const CustomStyledInput = {
  "& .MuiInputBase-root": {
    padding: "8px 16px",
    borderRadius: "10px",
    width: "100%",
    background: "#FFF",
    boxShadow: "0px 25px 30px 0px rgba(0, 98, 188, 0.15)",
    height: "39px",
  },
};

export const styledBoxContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

export const TypoStyled = {
  color: "#00294F",
  fontFamily: "Jost",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
};

export default function InventoryModal() {
  const [volumetricValue, setVolumetricValue] = useState(0);
  const { openInventoryModal, setOpenInventoryModal, DataPerfilBranch } =
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    useBoundStore((state: any) => state, shallow);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { RegisterInventory, getAllInventory }: any =
    useContext(InventoryContext);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { getAllBranch }: any = useContext(BranchContext);
  const formik = useFormik({
    initialValues: {
      date: "",
      id: 0,
      height: 0,
      width: 0,
      length: 0,
      weight: 0,
      branch: "",
    },
    validationSchema: modalInventoryScheme,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onSubmit: (values: any, { resetForm }) => {
      const volumetricWeight = calculateVolumetric(
        values.width.toString(),
        values.height.toString(),
        values.length.toString()
      );
      RegisterInventory(values, volumetricWeight);
      toast.success("¡Successfully created!", {
        duration: 2000,
        position: "top-center",
      });
      resetForm();
    },
  });
  useEffect(() => {
    if (
      formik.values.height > 0 &&
      formik.values.width > 0 &&
      formik.values.length > 0
    ) {
      console.log(
        formik.values.width,
        formik.values.height,
        formik.values.length
      );

      const volumetricWeight = calculateVolumetric(
        formik.values.width.toString(),
        formik.values.height.toString(),
        formik.values.length.toString()
      );
      setVolumetricValue(Number.parseFloat(volumetricWeight));
    }
  }, [formik.values]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getAllBranch();
  }, []);

  // const handleChange = (event: SelectChangeEvent) => {
  //     setSucursal(event.target.value as string);
  // };

  return (
    <Modal
      open={openInventoryModal}
      onClose={() => setOpenInventoryModal(false)}
    >
      <Box sx={styledModal}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <FormControl sx={styledBoxContainer}>
              <Typography sx={TypoStyled}>Date of entry</Typography>
              <TextField
                type="date"
                sx={CustomStyledInput}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                onChange={formik.handleChange}
                value={formik.values.date}
                id="date"
                name="date"
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={
                  formik.touched.date && formik.errors.date
                    ? formik.errors.date.toString()
                    : undefined
                }
              />
            </FormControl>

            <FormControl sx={styledBoxContainer}>
              <Typography sx={TypoStyled}>ID</Typography>
              <TextField
                type="number"
                sx={CustomStyledInput}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                inputProps={{ min: 0 }}
                name="id"
                id="id"
                value={formik.values.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.id && Boolean(formik.errors.id)}
                helperText={
                  formik.touched.id && formik.errors.id
                    ? formik.errors.id.toString()
                    : undefined
                }
              />
            </FormControl>

            <Typography sx={TypoStyled}>Size</Typography>

            <Box
              sx={{
                display: "flex",
                gap: { xs: "12px", md: "32px" },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <FormControl sx={styledBoxContainer}>
                <Typography sx={TypoStyled}>Height</Typography>
                <TextField
                  sx={CustomStyledInput}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  inputProps={{ min: 0 }}
                  name="height"
                  id="height"
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.height && Boolean(formik.errors.height)}
                  helperText={
                    formik.touched.height && formik.errors.height
                      ? formik.errors.height.toString()
                      : undefined
                  }
                />
              </FormControl>

              <FormControl sx={styledBoxContainer}>
                <Typography sx={TypoStyled}>Width</Typography>
                <TextField
                  sx={CustomStyledInput}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  inputProps={{ min: 0 }}
                  name="width"
                  id="width"
                  value={formik.values.width}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.width && Boolean(formik.errors.width)}
                  helperText={
                    formik.touched.width && formik.errors.width
                      ? formik.errors.width.toString()
                      : undefined
                  }
                />
              </FormControl>

              <FormControl sx={styledBoxContainer}>
                <Typography sx={TypoStyled}>Length</Typography>
                <TextField
                  sx={CustomStyledInput}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  inputProps={{ min: 0 }}
                  name="length"
                  id="length"
                  value={formik.values.length}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.length && Boolean(formik.errors.length)}
                  helperText={
                    formik.touched.length && formik.errors.length
                      ? formik.errors.length.toString()
                      : undefined
                  }
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <Typography sx={TypoStyled}>
                Volumetric weight: {volumetricValue}kg
              </Typography>
            </Box>

            <FormControl sx={styledBoxContainer}>
              <Typography sx={TypoStyled}>Weight</Typography>
              <TextField
                type="number"
                sx={CustomStyledInput}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                inputProps={{ min: 0 }}
                name="weight"
                id="weight"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={
                  formik.touched.weight && formik.errors.weight
                    ? formik.errors.weight.toString()
                    : undefined
                }
              />
            </FormControl>

            <FormControl sx={styledBoxContainer}>
              <Typography sx={TypoStyled}>Branch assignment</Typography>
              <Select
                sx={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  width: "100%",
                  background: "#FFF",
                  boxShadow: "0px 25px 30px 0px rgba(0, 98, 188, 0.15)",
                  height: "39px",
                }}
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
                onChange={formik.handleChange}
                value={formik.values.branch}
                placeholder={"Sleccionar sucursal"}
                name="branch"
                id="branch"
              >
                {DataPerfilBranch?.length === 0 && (
                  <MenuItem key={"1"} disabled>
                    Not found
                  </MenuItem>
                )}
                {DataPerfilBranch?.length > 0 &&
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  DataPerfilBranch.map((branch: any) => {
                    return (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.attributes.name}
                      </MenuItem>
                    );
                  })}
                {/* <MenuItem value={"Branch 2"}>Sucursal two</MenuItem>
                <MenuItem value={"Branch 3"}>Sucursal three</MenuItem>
                <MenuItem value={"Branch 4"}>Sucursal four</MenuItem> */}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              sx={{
                color: "#fff",
                width: "100%",
                backgroundColor: "#0062BC",
                borderRadius: "10px",
                padding: "8px 16px",
                textTransform: "capitalize",
              }}
              // onClick={() => console.log("añadido")}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Add new item
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
