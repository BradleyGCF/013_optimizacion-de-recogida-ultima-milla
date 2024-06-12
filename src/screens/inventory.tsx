import AreaChart from "@/components/chart/AreaChart";
import { Box, Button, Pagination, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useNavigate } from "react-router-dom";
import { TableDetails } from "@/components/tracking/table/table-details";
import InventoryModal from "@/components/modal/inventory-modal";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import { useContext, useEffect, useState } from "react";
import { InventoryContext } from "@/context/Inventory/InventoryContext";

export const TypographyStyled = {
  color: "var(--Color-primario, #00294F)",
  fontFamily: "Jost",
  fontSize: "1.3625rem",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
};

export default function Inventory() {
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const { setOpenInventoryModal, DataPerfilInventory } = useBoundStore(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (state: any) => state,
    shallow
  );
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { getAllInventory }: any = useContext(InventoryContext);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getAllInventory(page);
  }, [page]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        onClick={() => nav(-1)}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          width: "145px",
          cursor: "pointer",
        }}
      >
        <ArrowLeftIcon fontSize="large" />
        <Typography sx={TypographyStyled}>Inventory</Typography>
      </Box>

      <Typography sx={TypographyStyled}>Inventory overview</Typography>

      <Box
        sx={{
          backgroundColor: "#00294F",
        }}
      >
        <AreaChart />
      </Box>

      <TableDetails inventory={DataPerfilInventory} />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Pagination
          count={12}
          size="small"
          onChange={(event, value) => setPage(value)}
        />
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            width: "524px",
            backgroundColor: "#0062BC",
            borderRadius: "10px",
            padding: "8px 16px",
            textTransform: "capitalize",
          }}
          onClick={() => setOpenInventoryModal(true)}
        >
          Add new item
        </Button>
      </Box>
      <InventoryModal />
    </Box>
  );
}
