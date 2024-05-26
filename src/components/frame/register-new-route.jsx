import { Box, Typography } from "@mui/material";
import TextField from "@/components/TextField/TextField";
import ButtonPrimary from "@/components/buttons/button-primary";
import { useNavigate } from "react-router-dom";
import {Input} from '@mui/material/Input';

export default function RegisterNewRoute() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="subtitle1" color="text.fourth">
        Register New Route
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
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          title="starting point"
        />

        {/* <AccordionGlobal />
        <AccordionGlobal title="Branch B" />
        <AccordionGlobal title="Branch C" />
        <AccordionGlobal title="Branch E" /> */}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ButtonPrimary
          width="80%"
          onClick={() => navigate("/profile-routes/4")}
        >
          to register
        </ButtonPrimary>
      </Box>
    </Box>
  );
}
