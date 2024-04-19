import { SelectPackage } from "@/components/select/select-package";
import { TableDetails } from "@/components/select/table-details";
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputBase,
  MenuItem,
  Select,
  colors,
  styled,
} from "@mui/material";

export default function Package() {
  return (
    <Container
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "2.5rem",
      }}
    >
      <SelectPackage />
      <TableDetails />
    </Container>
  );
}
