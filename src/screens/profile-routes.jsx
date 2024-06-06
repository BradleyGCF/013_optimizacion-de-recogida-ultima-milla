import { Box, Typography, CardMedia, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import CardVehicles from "@/components/cards/cards-vehicles";
import { BranchContext } from "@/context/Branch/BranchContext";
import { useEffect, useContext, useState } from "react";
import { useBoundStore } from "@/stores/index";
import { useParams } from "react-router-dom";
import MapLeaflet from "../screens/MapLeaflet";

export const styleCard2 = {
  height: { xs: "100%", md: "60px" },
  width: { xs: "fit-content", md: "100%" },
  borderRadius: "10px",
  backgroundImage: "none",
  backgroundColor: "background.default",
  boxShadow:
    " 0px 2.76726px 2.21381px 0px rgba(0, 98, 188, 0.02), 0px 6.6501px 5.32008px 0px rgba(0, 98, 188, 0.03), 0px 12.52155px 10.01724px 0px rgba(0, 98, 188, 0.04), 0px 22.33631px 17.86905px 0px rgba(0, 98, 188, 0.04), 0px 41.77761px 33.42209px 0px rgba(0, 98, 188, 0.05), 0px 100px 80px 0px rgba(0, 98, 188, 0.07)",
};

export const styleCardContent2 = {
  height: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  gap: { xs: "20px", md: "0px" },
  p: { xs: "10px", md: "10px" },
  "&:last-child": {
    paddingBottom: { xs: "10px", md: "10px" },
  },
};

export const CardProfileRoutes = ({ address, city }) => {
  return (
    <Card sx={styleCard2}>
      <CardContent sx={styleCardContent2}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            {`${address}, ${city}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export const styleCardContent = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
export const styleMap = {
  height: { xs: "300px", sm: "500px" },
  width: "100%",
  backgroundColor: "blue",
};

export default function ProfileRoutes() {
  const { GetAllRoute } = useContext(BranchContext);
  const [availableRoute, setAvailableRoute] = useState(null);
  const { AllRoute } = useBoundStore();
  const { id } = useParams();
  const navigate = useNavigate();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getAllRoute = async () => await GetAllRoute();
    getAllRoute();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (AllRoute?.length > 0) {
      const route = AllRoute.find((rou) => rou.id === id);
      console.log({ route });
      setAvailableRoute(route);
    }
  }, [AllRoute]);

  if (!availableRoute) {
    return <div />;
  }

  return (
    <Box
      sx={{
        p: { xs: "20px", sm: "20px 50px" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ArrowLeftOutlinedIcon sx={{ color: "background.paper" }} />
        <Typography variant="subtitle1" color="text.fourth">
          Profile Route
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
        }}
      >
        {availableRoute?.branch?.[0] && (
          <Box sx={styleCardContent}>
            <Typography variant="body1" color="text.fourth">
              {availableRoute?.branch?.[0]?.attributes?.name}
            </Typography>
            <CardProfileRoutes
              address={availableRoute?.branch?.[0]?.attributes?.direction}
              city={availableRoute?.branch?.[0]?.attributes?.city}
            />
          </Box>
        )}
        {availableRoute?.branch?.[1] && (
          <Box sx={styleCardContent}>
            <Typography variant="body1" color="text.fourth">
              {availableRoute?.branch?.[1]?.attributes?.name}
            </Typography>
            <CardProfileRoutes
              address={availableRoute?.branch?.[1]?.attributes?.direction}
              city={availableRoute?.branch?.[1]?.attributes?.city}
            />
          </Box>
        )}
        {availableRoute?.branch?.[2] && (
          <Box sx={styleCardContent}>
            <Typography variant="body1" color="text.fourth">
              {availableRoute?.branch?.[2]?.attributes?.name}
            </Typography>
            <CardProfileRoutes
              address={availableRoute?.branch?.[2]?.attributes?.direction}
              city={availableRoute?.branch?.[2]?.attributes?.city}
            />
          </Box>
        )}
      </Box>
      <MapLeaflet
        address2={[
          {
            lat: availableRoute?.startingPoint?.latitude,
            lng: availableRoute?.startingPoint?.longitude,
          },
          {
            lat: availableRoute?.endingPoint?.latitude,
            lng: availableRoute?.endingPoint?.longitude,
          },
        ]}
      />
      <Typography variant="body1" color="text.fourth">
        00.000 km
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="subtitle1" color="text.fourth">
          assigned vehicle
        </Typography>
        <CardVehicles
          DataPerfilVehicles={availableRoute?.vehicle}
          isChat={true}
        />
      </Box>
    </Box>
  );
}
