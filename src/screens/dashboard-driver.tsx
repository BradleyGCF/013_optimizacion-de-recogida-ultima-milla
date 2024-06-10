import { Box, Button, Typography, styled } from "@mui/material";
import CardVehicles from "@/components/cards/cards-vehicles";
import CardBranchOffice from "@/components/cards/cards-branch-office";
import ButtonPrimary from "@/components/buttons/button-primary";
import NearMeIcon from "@mui/icons-material/NearMe";
import { TableDetails } from "@/components/select/table-details";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  VehiclesContext,
  type VehiclesContextType,
} from "@/context/Vehicles/VehiclesContext";
import {
  BranchContext,
  type BranchContextType,
} from "@/context/Branch/BranchContext";
import { getLocalStorage } from "@/hooks/getLocalStorage";
import { useBoundStore } from "@/stores/index";
import ShippingUpdate from "@/components/tracking/shippingUpdate/shippingUpdate";

interface Vehicle {
  id?: string;
  vehicleId?: string;
}

interface Shipment {
  id?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  routeId?: any;
  vehicleId?: Vehicle;
  entryDate?: string;
  productId?: string[];
  objectId?: string;
}

export default function DashboardDriver() {
  const navigate = useNavigate();
  const [render, setRender] = useState(0);
  const vehiclesContext = useContext<VehiclesContextType>(VehiclesContext);
  const branchContext = useContext<BranchContextType>(BranchContext);
  const { GetDataVehicle, AllShipment } = useBoundStore();
  const [lastShipment, setLastShipment] = useState<Shipment | null>(null);

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
    const vehicleid = getLocalStorage("vehicle");
    if (vehicleid?.vehicleId && vehiclesContext && render < 5) {
      vehiclesContext.IdGetVehicle(vehicleid.vehicleId);
      if (branchContext) {
        branchContext.GetAllShipment();
      }
      setRender(render + 1);
    }
  }, [vehiclesContext, branchContext]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (AllShipment.length > 0) {
      const vehicleid = getLocalStorage("vehicle");
      const shipmentForVehicleId = AllShipment?.reverse()?.filter(
        (ship: Shipment) => ship?.vehicleId?.id === vehicleid?.vehicleId
      );
      if (shipmentForVehicleId.length > 0) {
        const shipmentFormat = shipmentForVehicleId?.[0];
        setLastShipment(shipmentFormat);
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
            navigate(`/chat/${lastShipment?.id}`, {
              state: [
                {
                  lat: lastShipment?.routeId?.attributes?.startingPoint
                    ?.latitude,
                  lng: lastShipment?.routeId?.attributes?.startingPoint
                    ?.longitude,
                },
                {
                  lat: lastShipment?.routeId?.attributes?.endingPoint?.latitude,
                  lng: lastShipment?.routeId?.attributes?.endingPoint
                    ?.longitude,
                },
              ],
            })
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
