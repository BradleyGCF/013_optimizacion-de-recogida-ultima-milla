import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

const DataTypography = styled(Typography)({
  color: "var(--Color-primario, #00294F)",
  fontFamily: "Jost",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
});

export const RowData = ({ data }: any) => {
  return (
    <>
      <TableBody sx={{ backgroundColor: "white" }}>
        <TableRow>
          <TableCell align="center">
            <DataTypography>{data.item}</DataTypography>
          </TableCell>
          <TableCell align="center">
            <DataTypography>Entry date</DataTypography>
          </TableCell>
          <TableCell align="center">
            <DataTypography>ID</DataTypography>
          </TableCell>
          <TableCell align="center">
            <DataTypography>Quantity</DataTypography>
          </TableCell>
          <TableCell align="center">
            <DataTypography>State</DataTypography>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};
