import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { RowData } from "./row-data";

const HeadTypography = styled(Typography)({
  color: "#FFF",
  fontFamily: "Jost",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
  transform: "rotate(-0.014deg)",
});

export const TableDetails = ({ inventory }: any) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#0062BC",
            }}
          >
            <TableRow>
              <TableCell align="center">
                <HeadTypography>Item name</HeadTypography>
              </TableCell>
              <TableCell align="center">
                <HeadTypography>Entry date3</HeadTypography>
              </TableCell>
              <TableCell align="center">
                <HeadTypography>ID</HeadTypography>
              </TableCell>
              <TableCell align="center">
                <HeadTypography>Quantity</HeadTypography>
              </TableCell>
              <TableCell align="center">
                <HeadTypography>State</HeadTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          {inventory?.map((row: any, index: any) => {
            return <RowData key={index} data={row} />;
          })}
        </Table>
      </TableContainer>
    </>
  );
};
