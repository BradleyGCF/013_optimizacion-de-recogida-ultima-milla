import { Box, Typography } from "@mui/material";
import CardVehicles from "@/components/cards/cards-vehicles";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import RegisterVehicles from "../components/forms/register-vehicles";
import { useContext, useEffect, useState } from "react";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import { useBoundStore } from "@/stores/index";

export default function Vehicles() {
  const [loading, setLoading] = useState(true);
  const { getAllVehicles } = useContext(VehiclesContext);
  const { DataPerfilVehicles } = useBoundStore();
  const [vehicleSelect, setVehicleSelect] = useState([]);


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const allVehicles = async () => await getAllVehicles(1);
    allVehicles();
  }, []);

  const selectPlate = (data) => {
    if (data) {
      console.log(data, 'DATA');
      setVehicleSelect([data]);
    }
  };

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
      <InputSearchGlobal handleClick={selectPlate} type={"vehicle"} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
        }}
      >
        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              width: "100%",
            }}
          >
          </Box>
        )}
        {DataPerfilVehicles?.length === 0 &&
          !loading &&
          !vehicleSelect.length && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "10rem",
              }}
            >
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ fontSize: "20px !important" }}
              >
                Vehicles not found
              </Typography>
            </Box>
          )}
        {!vehicleSelect.length &&
          DataPerfilVehicles?.map((DataPerfilVehicles) => {
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            return (
              // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              // biome-ignore lint/complexity/useLiteralKeys: <explanation>
              <div
                key={DataPerfilVehicles.id}
                onClick={() => handleVehicleClick(DataPerfilVehicles)}
              >
                <CardVehicles DataPerfilVehicles={DataPerfilVehicles} />
              </div>
            );
          })}

        {!!vehicleSelect.length && (
          // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          // biome-ignore lint/complexity/useLiteralKeys: <explanation>
          <div
            key={vehicleSelect?.[0].id}
            onClick={() => handleVehicleClick(vehicleSelect?.[0])}
          >
            <CardVehicles DataPerfilVehicles={vehicleSelect?.[0]} />
          </div>
        )}
      </Box>
      <RegisterVehicles />
    </Box>
  );
}
