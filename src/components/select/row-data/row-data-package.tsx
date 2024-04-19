import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

const DataTypography = styled(Typography)({
  color: "var(--Color-primario, #00294F)",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
});

export const RowDataPackage = ({ data }: any) => {
  return (
    <>
      <TableBody
        sx={{
          backgroundColor: "white",
          background: "#FFF",
          borderBottom: "#e7eaf6 solid",
        }}
      >
        <TableRow>
          <TableCell
            align="left"
            sx={{
              paddingLeft: "3rem",
            }}
          >
            <DataTypography>{data.entry}</DataTypography>
          </TableCell>
          <TableCell align="left">
            <DataTypography>{data.id}</DataTypography>
          </TableCell>
          <TableCell align="right" sx={{ paddingRight: "3rem" }}>
            <DataTypography>{data.state}</DataTypography>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};
