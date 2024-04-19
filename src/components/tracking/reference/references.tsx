import { Box, CardMedia, Typography } from "@mui/material";
import img from "@/assets/Img/svg/reference.svg";

export const References = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "flex-start",
        alignItems: { xs: "flex-start", sm: "flex-end" },
        gap: { xs: "2rem", sm: "6rem", md: "25.5625rem", lg: "29.5625rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          aligItems: "flex-start",
          gap: "0.625rem",
        }}
      >
        <CardMedia
          image={img}
          sx={{
            width: "2.86875rem",
            height: "9.625rem",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2.1875rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                color: "var(--components-chip-defaultCloseFill, #000)",
                fontSize: "1.5625rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Point to start
            </Typography>
            <Typography
              sx={{
                color: "var(--components-chip-defaultCloseFill, #000)",
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Lorem ipsum street
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                color: "var(--components-chip-defaultCloseFill, #000)",
                fontSize: "1.5625rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Destination
            </Typography>
            <Typography
              sx={{
                color: "var(--components-chip-defaultCloseFill, #000)",
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Dolor sit amet street
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1.1875rem",
        }}
      >
        <Typography
          sx={{
            color: "var(--Color-primario, #00294F)",
            fontSize: "1.5625rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
          }}
        >
          Current location:
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              color: "var(--Color-primario, #00294F)",
              fontSize: "1.5625rem",
              paddingRight: ".5rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            20%
          </Typography>
          <Typography
            sx={{
              color: "var(--Color-primario, #00294F)",
              fontSize: "1.5625rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            of the route
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
