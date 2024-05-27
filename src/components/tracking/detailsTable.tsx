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
      <TableDetails inventory={card.productId}/>
    </>
  );
};
