import { Box, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useNavigate } from "react-router-dom";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const ArrowBack = ({ children }: any) => {
  console.log(children, "CHILDREN");
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
        {children}
      </Typography>
    </Box>
  );
};
