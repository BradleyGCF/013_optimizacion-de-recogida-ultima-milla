import {
  Card,
  CardContent,
  Box,
  Typography,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VehiclesImg from "@/assets/Img/png/vehiclesimg.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DetailsTable } from "../tracking/detailsTable";
import ShippingUpdate from "@/components/tracking/shippingUpdate/shippingUpdate";
const styleCard = {
  height: { xs: "100%", md: "140px" },
  width: "100%",
  backgroundImage: "none",
  backgroundColor: "background.default",
};

const styleCardContent = {
  height: "100%",
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  gap: { xs: "15px", md: "0px" },
  p: "30px",
  "&:last-child": {
    paddingBottom: "30px",
  },
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function CardTracking({ card, branches }: any) {
  const navigate = useNavigate();
  return (
    <Accordion
      sx={{
        borderRadius: "10px",
        background: "#FFFFFF",
        width: "100%",
        boxShadow:
          " 0px 2.76726px 2.21381px 0px rgba(0, 98, 188, 0.02), 0px 6.6501px 5.32008px 0px rgba(0, 98, 188, 0.03), 0px 12.52155px 10.01724px 0px rgba(0, 98, 188, 0.04), 0px 22.33631px 17.86905px 0px rgba(0, 98, 188, 0.04), 0px 41.77761px 33.42209px 0px rgba(0, 98, 188, 0.05), 0px 100px 80px 0px rgba(0, 98, 188, 0.07)",
      }}
    >
      {console.log({ card })}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          borderRadius: "10px",
        }}
      >
        <Box sx={styleCard}>
          <CardContent sx={styleCardContent}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "center" },
              }}
            >
              <CardMedia
                title="Vehicles"
                image={VehiclesImg}
                sx={{
                  backgroundSize: "cover",
                  objectFit: "cover",
                  height: { xs: "76px", md: "100%" },
                  width: "140px",
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
                {card.vehicleId.attributes.model}
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
                {card.vehicleId.attributes.capacity}
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
                {card.vehicleId.attributes.plate}
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
                Brach Office
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                {card.vehicleId.attributes?.branches?.[0]?.attributes?.name}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <DetailsTable card={card} />
        {/* <UpdateShipping id={card?.objectId} /> */}
      </AccordionDetails>
    </Accordion>
  );
}