import { Card, CardContent, Box, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styleCard = {
  height: { xs: "100%", md: "60px" },
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
  p: { xs: "10px", md: "10px" },
  "&:last-child": {
    paddingBottom: { xs: "10px", md: "10px" },
  },
};

export default function CardProfileRoutes() {
  let navigate = useNavigate();

  return (
    <Card sx={styleCard}>
      <CardContent sx={styleCardContent}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
          onClick={() => navigate(`/profile-routes/5`)}
        >
          <Typography
            variant="body1"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            Address
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
