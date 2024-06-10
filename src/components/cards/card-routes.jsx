import { Card, CardContent, Box, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styleCard = {
  height: { xs: "100%", md: "100px" },
  width: { xs: "fit-content", md: "100%" },
  borderRadius: "10px",
  backgroundImage: "none",
  backgroundColor: "background.default",
  boxShadow:
    " 0px 2.76726px 2.21381px 0px rgba(0, 98, 188, 0.02), 0px 6.6501px 5.32008px 0px rgba(0, 98, 188, 0.03), 0px 12.52155px 10.01724px 0px rgba(0, 98, 188, 0.04), 0px 22.33631px 17.86905px 0px rgba(0, 98, 188, 0.04), 0px 41.77761px 33.42209px 0px rgba(0, 98, 188, 0.05), 0px 100px 80px 0px rgba(0, 98, 188, 0.07)",
};

const styleCardContent = {
  height: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  gap: { xs: "20px", md: "0px" },
  p: { xs: "20px", md: "10px" },
  "&:last-child": {
    paddingBottom: { xs: "20px", md: "10px" },
  },
};

export default function CardRoutes({ route }) {
  const navigate = useNavigate();

  return (
    <Card sx={styleCard}>
      <CardContent sx={styleCardContent}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => navigate(`profile-routes/${route.id}`)}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            Start
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            {route.branch?.[0]?.attributes?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            Branch B
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            {route.branch?.[1]?.attributes?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            Distance
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            ----
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            Approximate Time
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            -------
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
