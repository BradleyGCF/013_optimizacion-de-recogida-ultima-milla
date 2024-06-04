import { Card, CardContent, Box, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VehiclesImg from "@/assets/Img/png/vehiclesimg.png";
import ButtonPrimary from "@/components/buttons/button-primary";
import NearMeIcon from "@mui/icons-material/NearMe";

const styleCard = {
  height: { xs: "100%", md: "140px" },
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
  gap: { xs: "15px", md: "0px" },
  p: "30px",
  "&:last-child": {
    paddingBottom: "30px",
  },
};

export default function CardVehicles({
  DataPerfilVehicles,
  handleOnClick,
  isChat,
}) {
  const img =
    DataPerfilVehicles?.[0]?.attributes?.fileigmvehicles || VehiclesImg;
  const navigate = useNavigate();
  return (
    <Card sx={styleCard}>
      <CardContent sx={styleCardContent}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "start" },
          }}
        >
          <CardMedia
            title="Vehicles"
            image={img}
            sx={{
              backgroundSize: "cover",
              objectFit: "cover",
              height: { xs: "76px", md: "100%" },
              width: "140px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (handleOnClick) {
                handleOnClick(DataPerfilVehicles);
              } else {
                navigate(`/dashboard/profile-vehicle/${DataPerfilVehicles.id}`);
              }
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "text.fourth",
              textAlign: "center",
              paddingTop: "2rem",
            }}
          >
            Model
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {DataPerfilVehicles?.attributes?.model}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "text.fourth",
              textAlign: "center",
              paddingTop: "2rem",
            }}
          >
            Capacity
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {DataPerfilVehicles?.attributes?.capacity}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "text.fourth",
              textAlign: "center",
              paddingTop: "2rem",
            }}
          >
            Plate
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {DataPerfilVehicles?.attributes?.plate}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isChat && (
            <>
              <Typography
                variant="h4"
                sx={{
                  color: "text.fourth",
                  textAlign: "center",
                  paddingTop: "2rem",
                }}
              >
                Brach Office
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                {DataPerfilVehicles?.attributes?.branches?.[0]?.attributes?.name
                  ? DataPerfilVehicles?.attributes?.branches?.[0]?.attributes
                      ?.name
                  : "branch not found"}
              </Typography>
            </>
          )}
          {isChat && (
            <Box sx={{ display: "flex", width: "100%" }}>
              <ButtonPrimary
                backgroundColor={"#0062BC"}
                onClick={() => navigate("/chat")}
              >
                <Box sx={{ display: "flex", gap: ".5rem" }}>
                  <Typography>Chat</Typography>
                  <NearMeIcon fontSize="small" sx={{ color: "white" }} />
                </Box>
              </ButtonPrimary>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
