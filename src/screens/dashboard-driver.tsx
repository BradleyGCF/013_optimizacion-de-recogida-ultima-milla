import { Box, Button, Typography, styled } from "@mui/material";
import CardVehicles from "@/components/cards/cards-vehicles";
import CardBranchOffice from "@/components/cards/cards-branch-office";
import ButtonPrimary from "@/components/buttons/button-primary";
import NearMeIcon from "@mui/icons-material/NearMe";
import { TableDetails } from "@/components/select/table-details";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import { getLocalStorage } from "@/hooks/getLocalStorage";
import { useBoundStore } from "@/stores/index";
import UpdateShipping from "@/components/tracking/shippingUpdate/shippingUpdate";

export default function DashboardDriver() {
  const navigate = useNavigate();
  const { IdGetVehicle }: any = useContext(VehiclesContext);
  const { GetDataVehicle } = useBoundStore();
  console.log(GetDataVehicle, "GETVEHICLE");

  const BoxTitle = styled(Box)({
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    gap: "2.5rem",
  });
  const Title = styled(Typography)({
    color: "#00294F",
    fontFamily: "Jost",
    fontSize: "1.5625rem",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
  });

  useEffect(() => {
    const vehilcleid = getLocalStorage("vehicle");
    console.log(vehilcleid?.vehicleId, "ID DASHBOARD");
    IdGetVehicle(vehilcleid.vehicleId);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3.3125rem",
      }}
    >
      <BoxTitle>
        <Title>Vehicles</Title>
      </BoxTitle>
      <Box sx={{ width: "100%" }}>
        <CardVehicles DataPerfilVehicles={GetDataVehicle[0]} />
      </Box>
      <BoxTitle>
        <Title>Route</Title>
      </BoxTitle>
      <Box sx={{ width: "100%" }}>
        <CardBranchOffice />
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Typography
          sx={{
            color: "#00294F",
            fontSize: "1.5625rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            flexGrow: 1,
          }}
        >
          Fecha y hora de salida
        </Typography>
        <ButtonPrimary
          backgroundColor={"#0062BC"}
          onClick={() => navigate("/chat")}
        >
          <Box sx={{ display: "flex", gap: ".5rem" }}>
            <Typography>Chat</Typography>
            <NearMeIcon fontSize="small" sx={{ color: "white" }} />
          </Box>
        </ButtonPrimary>
      </Box>
      <BoxTitle>
        <Title>Assigned inventory</Title>
      </BoxTitle>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <TableDetails />
      </Box>
      <Box sx={{ width: "100%" }}>
        <UpdateShipping />
      </Box>
    </Box>
  );
}
