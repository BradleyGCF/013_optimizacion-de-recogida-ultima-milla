import { Box, Typography } from "@mui/material";
import CardBranchOffice from "@/components/cards/cards-branch-office";
import RegisterVehicles from "@/components/forms/register-vehicles";

export default function ProfileVehicle() {
  return (
    <Box
      sx={{
        p: "20px 50px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <RegisterVehicles tilte={true} />
      <Box>
        <Typography variant="subtitle1" color="text.fourth">
          Branch Office
        </Typography>
        <CardBranchOffice />
      </Box>
    </Box>
  );
}
