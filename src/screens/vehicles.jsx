import { Box, Typography } from "@mui/material";
import CardVehicles from "@/components/cards/cards-vehicles";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import RegisterVehicles from "@/components/forms/register-vehicles";

export default function Vehicles() {
  return (
    <Box
      sx={{
        p: { xs: "20px", sm: "20px 50px" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="subtitle1" color="text.fourth">
        Vehicles
      </Typography>
      <InputSearchGlobal />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
        }}
      >
        {[1, 2, 3].map((v, index) => {
          return <CardVehicles id={index}/>
        })}
      </Box>
      <RegisterVehicles />
    </Box>
  );
}
