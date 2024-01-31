import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Autocomplete, Box, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";

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

export default function InputSearchGlobal(props) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({ id: "", label: "" });
  const [stateCircularProgress, setStateCircularProgress] = useState(false);
  let optionsParams = props.option;
  let optionId = props.id;
  let optionLabel = props.label;

  const loading = open && (optionsParams?.length ?? 0) !== 0;

  const option = optionsParams
    ? optionsParams.map((option) => ({
        id: option.optionId,
        label: option.optionLabel,
      }))
    : [];

  useEffect(() => {
    // const filterFunc = async (inputValue) => {
    //   const resultFilterQuery = await getSearchArtistsPag(0, inputValue, true);
    // };
    // filterFunc(inputValue);
  }, [inputValue]);

  useEffect(() => {
    (async () => {
      await sleep(1e3);
    })();
  }, [loading]);

  function FilterItemsToGo(value) {
    // let coincidence = false;
    // const filterFunc = async (value) => {
    //   setSearchArtistsPag(value, "Search");
    //   setTimeout(() => {
    //     setStateUnstyledCircularProgress(false);
    //   }, 4000);
    // };
    // StatePageArtistFilterOptionsAutocomplete.forEach((element) => {
    //   if (element.username == value.label && element.ethAddress == value.id) {
    //     coincidence = true;
    //     filterFunc(value.label);
    //   }
    // });
    // if (!coincidence) {
    //   setValue({ id: "", label: "Not Found" });
    //   setStateUnstyledCircularProgress(false);
    // }
  }

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  return (
    <Box justifyContent="flex-start" width="100%">
      <Autocomplete
        value={value}
        loading={loading}
        inputValue={inputValue}
        options={option}
        onInputChange={(_event, newValue) => {
          setInputValue(newValue);
          setValue({ id: "", label: newValue });
        }}
        onChange={(event, value) => {
          value
            ? (setStateCircularProgress(true), FilterItemsToGo(value))
            : null;
        }}
        renderOption={(props, option, state) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={state.index}
          >
            User: {option.label} Wallet: {option.id.slice(0, 6)}...
            {option.id.slice(-4)}
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
              placeholder={props.placeHolder}
              sx={{ padding: 0 }}
              onKeyPress={(event) => {
                if (event.code == "Enter") {
                  setStateCircularProgress(true);
                  FilterItemsToGo(value);
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
