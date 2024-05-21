import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RegisterBranchOfficeProfile from "@/components/forms/register-branch-office-profile";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import CardVehicles from "@/components/cards/cards-vehicles";

export default function ProfileBranchOffice() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: { xs: "20px", sm: "20px 50px" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ArrowLeftOutlinedIcon
          onClick={() => navigate("/dashboard")}
          sx={{ color: "background.paper" }}
        />
        <Typography variant="subtitle1" color="text.fourth">
          Profile Branch Office
        </Typography>
      </Box>

      <RegisterBranchOfficeProfile />
      <CardVehicles />
    </Box>
  );
}
