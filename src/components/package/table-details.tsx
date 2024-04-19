import styled from "@emotion/styled";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { RowDataPackage } from "./row-data/row-data-package";

const HeadTypography = styled(Typography)({
  color: "#FFF",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
  transform: "rotate(-0.014deg)",
});

export const TableDetails = () => {
  const row = [
    {
      item: "Item name",
      entry: "Entry date",
      id: "ID",
      quantity: "Quantity",
      state: "State",
    },
    {
      item: "Item name",
      entry: "Entry date",
      id: "ID",
      quantity: "Quantity",
      state: "State",
    },
    {
      item: "Item name",
      entry: "Entry date",
      id: "ID",
      quantity: "Quantity",
      state: "State",
    },
  ];
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "0.625rem" }}>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "#0062BC",
          }}
        >
          <TableRow>
            <TableCell align="left" sx={{ paddingLeft: "3rem" }}>
              <HeadTypography>Entry date</HeadTypography>
            </TableCell>
            <TableCell align="left">
              <HeadTypography>ID</HeadTypography>
            </TableCell>
            <TableCell align="right" sx={{ paddingRight: "3rem" }}>
              <HeadTypography>State</HeadTypography>
            </TableCell>
          </TableRow>
        </TableHead>
        {row.map((row: any) => {
          return <RowDataPackage data={row} />;
        })}
      </Table>
    </TableContainer>
  );
};
