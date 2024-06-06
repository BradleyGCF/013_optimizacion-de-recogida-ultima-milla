import { Box, Typography } from "@mui/material";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import CardBranchOffice from "@/components/cards/cards-branch-office";
import RegisterBranchOffice from "@/components/forms/register-branch-office";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import { useBoundStore } from "@/stores/index";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useState } from "react";

export default function BranchOffice() {
  const [loading, setLoading] = useState(true);
  const [vehicleSelect, setVehicleSelect] = useState([]);
  // const { getAllBranch } = useContext(BranchContext);
  const { DataPerfilBranch, DataPerfilVehicles } = useBoundStore();
  const { getAllVehicles } = useContext(VehiclesContext);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // const allBranch = async () => await getAllBranch();
    // allBranch();
    const allVehicles = async () => await getAllVehicles(1);
    allVehicles();
    setLoading(false);
  }, []);

  const selectPlate = (data) => {
    if (data) {
      console.log(data, "DATA");
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
        Branch Office
      </Typography>
      <InputSearchGlobal option={selectPlate} type={"branch"} />
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
            <CircularProgress style={{ color: "#00294F" }} size="100px" />
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
        {DataPerfilVehicles?.length > 0 &&
          DataPerfilVehicles.map((e, index) => {
            return (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                key={DataPerfilVehicles.id}
                onClick={() => handleVehicleClick(DataPerfilVehicles)}
              >
                <CardBranchOffice key={index} branch={e} />
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
            <CardBranchOffice DataPerfilVehicles={vehicleSelect?.[0]} />
          </div>
        )}
      </Box>
      <RegisterBranchOffice />
    </Box>
  );
}
