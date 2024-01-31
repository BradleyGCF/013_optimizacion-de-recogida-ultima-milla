import { Box, Typography } from "@mui/material";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import CardBranchOffice from "@/components/cards/cards-branch-office";
import RegisterBranchOffice from "@/components/forms/register-branch-office";

export default function BranchOffice() {
  return (
    <Box
      sx={{
        p: { xs: "20px", sm: "20px 50px" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="subtitle1" color="text.fourth">
        Branch Office
      </Typography>
      <InputSearchGlobal />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
        }}
      >
        <CardBranchOffice />
        <CardBranchOffice />
        <CardBranchOffice />
      </Box>

      <RegisterBranchOffice />
    </Box>
  );
}
