import { Box, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useNavigate } from "react-router-dom";

export const ArrowBack = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => navigate("/dashboard")}
    >
      <ArrowLeftIcon fontSize="large" />
      <Typography
        sx={{
          color: "var(--Color-primario, #00294F)",
          fontFamily: "Jost",
          fontSize: "1.3625rem",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "normal",
        }}
      >
        Tracking
      </Typography>
    </Box>
  );
};
