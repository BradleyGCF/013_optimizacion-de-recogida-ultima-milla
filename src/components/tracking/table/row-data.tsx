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
            <DataTypography>{data?.attributes?.name}</DataTypography>
          </TableCell>
          <TableCell align="center">
            <DataTypography>
              {data?.attributes?.entryDate
                ? data?.attributes.entryDate
                : "Entry date"}
            </DataTypography>
          </TableCell>
          <TableCell align="center">
            <DataTypography>{data?.id ? data.id : "ID"}</DataTypography>
          </TableCell>
          <TableCell align="center">
            <DataTypography>
              {data?.attributes?.productLength
                ? data?.attributes.productLength
                : "Quantity"}
            </DataTypography>
          </TableCell>
          <TableCell align="center">
            <DataTypography>
              {data?.attributes?.status ? data?.attributes.status : "State"}
            </DataTypography>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};
