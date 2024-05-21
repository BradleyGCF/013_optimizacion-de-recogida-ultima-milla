import { ArrowBack } from "@/components/arrow-back/arrow-back";
import CardMaps from "@/components/cards/card-maps";
import { References } from "@/components/tracking/reference/references";
import { Box, CardMedia, Container } from "@mui/material";

const styleMap = {
  height: { xs: "200px", sm: "42.105rem" },
  width: "100%",
  backgroundColor: "blue",
};

export default function TrackingCurrent() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "2.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <ArrowBack>Ruta (Indicar la ruta aquí)</ArrowBack>
        <References />
      </Box>
      <Box sx={styleMap}>
        <CardMaps />
      </Box>
    </Container>
  );
}
