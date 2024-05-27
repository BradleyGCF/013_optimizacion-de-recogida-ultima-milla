import { Box, Container, Typography } from "@mui/material";
import { ArrowBack } from "@/components/arrow-back/arrow-back";
import { NavTracking } from "@/components/tracking/nav-tracking";
import CardTracking from "@/components/cards/card-tracking";
import { shallow } from "zustand/shallow";
import { BranchContext } from "@/context/Branch/BranchContext";
import { useBoundStore } from "@/stores/index";
import { useEffect, useState, useContext } from "react";

export default function Tracking() {
  const { GetAllShipment, getAllBranch } = useContext(BranchContext);
  const [dataTrackingShipment, setDataTrackingShipment] = useState([]);
  const [showShipment, setshowShipment] = useState([]);
  const [step, setStep] = useState("programmed");
  const { AllShipment, DataPerfilBranch } = useBoundStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getAllDataShipment = async () => {
      const response = await GetAllShipment();
      if (response?.data) {
        setDataTrackingShipment(response?.data);
      }
    };
    const allBranches = async () => await getAllBranch();
    allBranches();
    getAllDataShipment();
  }, []);

  const filteredShipments = (status) => {
    if (status === "programmed") {
      const filteredShipments = AllShipment.filter(
        (shipment) => shipment.status === "programado"
      );
      setshowShipment(filteredShipments);
      return;
    }
    if (status === "road") {
      const filteredShipments = AllShipment.filter(
        (shipment) => shipment.status === "en ruta"
      );
      setshowShipment(filteredShipments);
      return;
    }
    if (status === "finished") {
      const filteredShipments = AllShipment.filter(
        (shipment) => shipment.status === "finalizado"
      );
      setshowShipment(filteredShipments);
      return;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    filteredShipments(step);
  }, [step, AllShipment]);

  return (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "2.5rem",
        paddingTop: "2rem",
      }}
    >
      <ArrowBack>Tracking</ArrowBack>
      <NavTracking setStep={setStep} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        {showShipment?.map((shipment) => (
          <CardTracking
            key={shipment?.id}
            card={shipment}
            branches={DataPerfilBranch}
          />
        ))}
      </Box>
    </Container>
  );
}
