import { Box, Typography } from "@mui/material";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import CardBranchOffice from "@/components/cards/cards-branch-office";
import RegisterBranchOffice from "@/components/forms/register-branch-office";
import { BranchContext } from "@/context/Branch/BranchContext";
import { useBoundStore } from "@/stores/index";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useState } from "react";

export default function BranchOffice() {
  const [loading, setLoading] = useState(true);
  const { getAllBranch } = useContext(BranchContext);
  const { DataPerfilBranch } = useBoundStore();
  useEffect(() => {
    const allBranch = async () => await getAllBranch();
    allBranch();
    setLoading(false)
  }, [])
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
      <InputSearchGlobal option={DataPerfilBranch} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
        }}>
        {loading &&
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              width: '100%'
            }}
          >
            <CircularProgress style={{ color: "#00294F" }} size="100px" />
          </Box>
        }
        {DataPerfilBranch?.length === 0 && !loading && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '10rem',
          }}>
            <Typography variant="body1" color="text.primary" sx={{ fontSize: '20px !important', }}>
              Vehicles not found
            </Typography>
          </Box>
        )}
        {DataPerfilBranch?.length > 0 && DataPerfilBranch.map((e, index) => {
          return <CardBranchOffice key={index} branch={e} />
        })}
      </Box>
      <RegisterBranchOffice />
    </Box>
  );
}
