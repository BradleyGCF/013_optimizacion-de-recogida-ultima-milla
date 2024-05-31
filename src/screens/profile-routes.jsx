import { Box, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import CardProfileRoutes from "@/components/cards/card-profile-routes";
import CardVehicles from "@/components/cards/cards-vehicles";

const styleCardContent = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
const styleMap = {
  height: { xs: "300px", sm: "500px" },
  width: "100%",
  backgroundColor: "blue",
};

export default function ProfileRoutes() {
  const navigate = useNavigate();

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
        <ArrowLeftOutlinedIcon
          onClick={() => navigate("/")}
          sx={{ color: "background.paper" }}
        />
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
        <Box sx={styleCardContent}>
          <Typography variant="body1" color="text.fourth">
            starting point
          </Typography>
          <CardProfileRoutes />
        </Box>
        <Box sx={styleCardContent}>
          <Typography variant="body1" color="text.fourth">
            starting point
          </Typography>
          <CardProfileRoutes />
        </Box>
        <Box sx={styleCardContent}>
          <Typography variant="body1" color="text.fourth">
            starting point
          </Typography>
          <CardProfileRoutes />
        </Box>
      </Box>

      <Box sx={styleMap}>
        <CardMedia title="" image="" sx={{}} />
      </Box>
      <Typography variant="body1" color="text.fourth">
        00.000 km
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="subtitle1" color="text.fourth">
          assigned vehicle
        </Typography>
        <CardVehicles />
      </Box>
    </Box>
  );
}
