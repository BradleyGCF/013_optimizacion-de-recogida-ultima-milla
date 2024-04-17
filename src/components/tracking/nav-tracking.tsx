import { Box, Typography, styled } from "@mui/material";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";

const TypographyNav = styled(Typography)({
  color: "var(--Color-primario, #00294F)",
  fontFamily: "Jost",
  fontSize: "1.2625rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  cursor: "pointer",
});

export const NavTracking = () => {
  const { Tracking, setTracking } = useBoundStore(
    (state: any) => state,
    shallow
  );
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      <TypographyNav
        sx={{
          textDecorationLine: Tracking === "programmed" ? "underline" : "none",
        }}
        onClick={(e) => setTracking("programmed")}
      >
        Programmed
      </TypographyNav>
      <TypographyNav
        sx={{
          textDecorationLine: Tracking === "road" ? "underline" : "none",
        }}
        onClick={(e) => setTracking("road")}
      >
        On road
      </TypographyNav>
      <TypographyNav
        sx={{
          textDecorationLine:
            Tracking === "finished" ? "underline" : "finished",
        }}
        onClick={(e) => setTracking("finished")}
      >
        Finished
      </TypographyNav>
    </Box>
  );
};
