import { Box, Typography } from "@mui/material";
import ChatSection from "@/components/sections/ChatSection";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

export default function Chat() {
  return (
    <Box
      sx={{
        bgColor: "grey",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "125px",
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <ArrowLeftIcon
          sx={{
            fontSize: "50px",
          }}
        />
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
          Chat
        </Typography>
      </Box>

      <ChatSection />
    </Box>
  );
}
