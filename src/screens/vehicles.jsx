import { Box, Typography } from "@mui/material";
import CardVehicles from "@/components/cards/cards-vehicles";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import RegisterVehicles from "../components/forms/register-vehicles";
import { useContext, useEffect, useState } from "react";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import { useBoundStore } from "@/stores/index";
import CircularProgress from "@mui/material/CircularProgress";

export default function Vehicles() {
  const [loading, setLoading] = useState(true);
  const { getAllVehicles } = useContext(VehiclesContext);
  const { DataPerfilVehicles } = useBoundStore();
  useEffect(() => {
    const allVehicles = async () => await getAllVehicles()
    allVehicles();
    setTimeout(() => {
      setLoading(false)
    }, 3000)

  }, [])
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
        {loading &&
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              width: '100%'
            }}
          >
            <CircularProgress size="100px" color="secondary" />
          </Box>
        }
        {DataPerfilVehicles?.length === 0 && !loading && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '10rem',
          }}>
            <Typography variant="body1" color="text.primary" sx={{ fontSize: '20px !important', }}>
              Vehicles not found
            </Typography>
          </Box>
        )}
        {DataPerfilVehicles?.map((v, index) => {
          return <CardVehicles id={index} />
        })}

      </Box>
      <RegisterVehicles />
    </Box>
  );
}
