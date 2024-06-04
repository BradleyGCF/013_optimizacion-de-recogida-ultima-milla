import { Box, Button, Typography, styled } from "@mui/material";
import CardVehicles from "@/components/cards/cards-vehicles";
import CardBranchOffice from "@/components/cards/cards-branch-office";
import ButtonPrimary from "@/components/buttons/button-primary";
import NearMeIcon from "@mui/icons-material/NearMe";
import { TableDetails } from "@/components/select/table-details";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import { getLocalStorage } from "@/hooks/getLocalStorage";
import { useBoundStore } from "@/stores/index";
import ShippingUpdate from "@/components/tracking/shippingUpdate/shippingUpdate";
import { BranchContext } from "@/context/Branch/BranchContext";

export default function DashboardDriver() {
  const navigate = useNavigate();
  const { IdGetVehicle } = useContext(VehiclesContext);
  const { GetDataVehicle, AllShipment } = useBoundStore();
  const { GetAllShipment } = useContext(BranchContext);
  const [lastShipment, setLastShipment] = useState(null);
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const vehilcleid = getLocalStorage("vehicle");
    console.log(vehilcleid, "ID DASHBOARD");
    IdGetVehicle(vehilcleid.vehicleId);
    GetAllShipment();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (AllShipment.length > 0) {
      const vehilcleid = getLocalStorage("vehicle");
      const shipmentForVehicleId = AllShipment.reverse().filter(
        (ship) => ship?.vehicleId?.id === vehilcleid?.vehicleId
      );
      console.log({ shipmentForVehicleId });
      if (shipmentForVehicleId.length > 0) {
        const shipmentFormat = shipmentForVehicleId?.[0];
        setLastShipment(shipmentFormat);
        console.log(shipmentFormat);
      }
    }
  }, [AllShipment]);

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
        <Typography
          sx={{
            color: "#00294F",
            fontSize: "1.3rem",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            flexGrow: 1,
          }}
        >
          {lastShipment?.entryDate}
        </Typography>
        <ButtonPrimary
          backgroundColor={"#0062BC"}
          onClick={() =>
            navigate(`/chat/${getLocalStorage("vehicle")?.vehicleId}`)
          }
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
        {lastShipment && <TableDetails products={lastShipment.productId} />}
      </Box>
      <Box sx={{ width: "100%" }}>
        <ShippingUpdate id={lastShipment?.objectId} />
      </Box>
    </Box>
  );
}
