import { Box, Typography } from "@mui/material";
import CardBranchOffice from "@/components/cards/cards-branch-office";
import UpdateFormVehicle from "../components/forms/update-Form-Vehicle"
import { useState, useEffect, useContext } from "react";
import { useBoundStore } from "@/stores/index";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import { useParams } from "react-router-dom";

export default function ProfileVehicle() {
  // const [objectId, setObjectId] = useState("");
  const { GetDataVehicle } = useBoundStore();
  const { IdGetVehicle } = useContext(VehiclesContext);
  const { id } = useParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        await IdGetVehicle(id);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData();
  }, [id]);

  return (
    <Box
      sx={{
        p: "20px 50px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <UpdateFormVehicle
        tilte={true}
        GetDataVehicle={GetDataVehicle}
        id={id}
      />
      <Box>
        <Typography variant="subtitle1" color="text.fourth">
          Branch Office
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <CardBranchOffice id={1} />
          <CardBranchOffice id={2} />
        </Box>
      </Box>
    </Box>
  );
}
