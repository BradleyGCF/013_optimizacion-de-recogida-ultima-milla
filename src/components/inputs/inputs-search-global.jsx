import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Autocomplete, Box, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "@/context/User/UserContext";
import { useBoundStore } from "@/stores/index";

const TextFieldCustom = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "& .MuiInputBase-input": {
      color: "common.two",
    },
  },
});

export default function InputSearchGlobal({
  type,
  handleClick,
  placeHolder = "",
}) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({ id: "", label: "" });
  const [stateCircularProgress, setStateCircularProgress] = useState(false);
  const { GetAllSearchBarOption } = useContext(UserContext);
  const { SearchBarOption } = useBoundStore();

  const [options, setOptions] = useState([]);

  const loading = open && options.length === 0;
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (type) {
      console.log({ type });
      GetAllSearchBarOption(type);
    }
  }, [type]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (SearchBarOption?.length) {
      setOptions(SearchBarOption);
    }
  }, [SearchBarOption]);

  const handleInputChange = (_event, newValue) => {
    setInputValue(newValue);
    setValue({ id: "", label: newValue });
  };

  const handleChange = (event, newValue) => {
    if (newValue) {
      setStateCircularProgress(true);
      setValue(newValue);
      setStateCircularProgress(false);
    }
  };

  return (
    <Box justifyContent="flex-start" width="100%">
      <Autocomplete
        value={value}
        loading={loading}
        inputValue={inputValue}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option.id}
            onClick={() => handleClick(option?.data)}
          >
            <div style={{ color: "white" }}> {option.label}</div>
          </Box>
        )}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        renderInput={(params) => (
          <Box
            py={0}
            px={2}
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid",
              borderColor: "icon.third",
              borderRadius: "10px",
              height: "45px",
              ".css-1q60rmi-MuiAutocomplete-endAdornment": {
                top: "auto",
              },
            }}
          >
            <SearchIcon sx={{ color: "icon.third", fontSize: "30px" }} />
            <TextFieldCustom
              hiddenLabel
              placeholder={placeHolder || ""}
              sx={{ padding: 0 }}
              onKey={(event) => {
                if (event.code === "Enter") {
                  setStateCircularProgress(true);
                  handleChange(event, value);
                }
              }}
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {stateCircularProgress ? (
                      <CircularProgress sx={{ color: "#8c8c8c" }} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          </Box>
        )}
      />
    </Box>
  );
}
