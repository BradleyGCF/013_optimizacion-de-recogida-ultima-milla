import React, { useContext } from "react";
import { Typography, Button, Box } from "@mui/material";
import { BranchContext } from "@/context/Branch/BranchContext";
import Swal from "sweetalert2";

const ShippingUpdate = ({ id }) => {
  const { UpdateShipment } = useContext(BranchContext);

  const updateShippingStatus = (status) => {
    console.log({ status, id });

    const dataUpdate = {
      objectData: {
        status,
      },
      objectId: id,
    };

    UpdateShipment(dataUpdate);
    Swal.fire({
      icon: "success",
      title: "Envío actualizado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          color: "text.fourth",
          paddingTop: "2rem",
        }}
      >
        Status
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "space-around",
        }}
      >
        <Button
          onClick={() => updateShippingStatus("programado")}
          variant="contained"
        >
          Programado
        </Button>
        <Button
          onClick={() => updateShippingStatus("en ruta")}
          variant="contained"
        >
          En Ruta
        </Button>
        <Button
          onClick={() => updateShippingStatus("finalizado")}
          variant="contained"
        >
          Finalizado
        </Button>
      </Box>
    </div>
  );
};

export default ShippingUpdate;
