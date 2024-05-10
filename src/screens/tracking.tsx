import { Box, Container, Typography } from "@mui/material";
import { ArrowBack } from "@/components/arrow-back/arrow-back";
import { NavTracking } from "@/components/tracking/nav-tracking";
import CardTracking from "@/components/cards/card-tracking";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";

export default function Tracking() {
  const { Tracking } = useBoundStore((state: any) => state, shallow);
  const arr = [
    {
      id: "1",
      status: "road",
    },
    {
      id: "1",
      status: "programmed",
    },
    {
      id: "1",
      status: "finished",
    },
    {
      id: "1",
      status: "road",
    },
    {
      id: "1",
      status: "programmed",
    },
    {
      id: "1",
      status: "programmed",
    },
  ];
  const filter = arr.filter((card: any) => card.status === Tracking);
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
      <NavTracking />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        {filter.map((card: any) => {
          return <CardTracking key={card.id} card={card} />;
        })}
      </Box>
    </Container>
  );
}
