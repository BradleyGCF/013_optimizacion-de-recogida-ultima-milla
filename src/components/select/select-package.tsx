import {
  Box,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { useState } from "react";

export const SelectPackage = () => {
  const [zona, setZona] = useState("");
  const handleChange = (event: any) => {
    setZona(event.target.value);
  };
  const arr = [
    {
      id: "1",
      value: "All",
    },
    {
      id: "2",
      value: "Zona 1",
    },
    {
      id: "3",
      value: "Zona 2",
    },
    {
      id: "4",
      value: "Zona 3",
    },
  ];
  const InputStyled = styled(InputBase)(() => ({
    "& .MuiInputBase-input": {
      position: "relative",
      backgroundColor: "#0062BC",
      fontSize: 16,
      padding: "0.5rem 1rem",
      display: "flex",
      alignItems: "center",
      fontWeight: 400,
      borderRadius: "0.625rem",
      gap: "10px",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));
  return (
    <Box>
      <FormControl
        sx={{
          m: 1,
          minWidth: "5.875rem",
          backgroundColor: "white",
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={zona === "" ? "" : zona}
          placeholder="All"
          onChange={handleChange}
          input={<InputStyled placeholder="All" />}
          inputProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: "white",
                  color: "#0062BC",
                  ".css-wn4367-MuiButtonBase-root-MuiMenuItem-root": {
                    fontSize: "16px!important",
                    fontWeight: 400,
                  },
                },
              },
            },
          }}
        >
          {arr.map((option) => {
            return (
              <MenuItem
                key={option.id}
                value={option.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px",
                  "&:hover": {
                    backgroundColor: "#E6E6E6",
                  },
                }}
              >
                {option.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
