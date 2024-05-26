import { Card, CardContent, Box, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styleCard = {
  cursor: "pointer",
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

export default function CardRoutesV2({ handleOnclick, data }) {
  return (
    <Card onClick={() => handleOnclick(data)} sx={styleCard}>
      <CardContent sx={styleCardContent}>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.fourth", textAlign: "center" }}
          >
            {data?.id}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          {data?.branch?.map((branch) => {
            return (
              <Typography
                variant="h4"
                sx={{ color: "text.fourth", textAlign: "center" }}
              >
                {branch?.attributes?.name || "sin nombre de sucursal"}
              </Typography>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
