import {
  Box,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { TableDate } from "./table/table-date";
import { TableDetails } from "./table/table-details";

const StyledTypography = styled(Typography)({
  color: "#FFF",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
});

export const DetailsTable = ({ card }: any) => {
  const rows = [
    {
      name: "Frozen yoghurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    {
      name: "Eclair",
      calories: 262,
      fat: 16.0,
      carbs: 24,
      protein: 6.0,
    },
    {
      name: "Cupcake",
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
  ];
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <StyledTypography>Road</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Inicio</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Branch offices A</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Branch offices B</StyledTypography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableDate card={card} />
      <TableDetails />
    </>
  );
};
