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
import { useLocation } from "react-router-dom";


const HeadTypography = styled(Typography)({
  color: "#FFF",
  fontFamily: "Jost",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
  transform: "rotate(-0.014deg)",
});

export const TableDetails = ({ inventory, handleOnClick }: any) => {
  const location = useLocation().pathname;
  return (
    <div style={{ cursor: "pointer", width:"100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#0062BC",
            }}
          >
            <TableRow>
              {location === "/dashboard/inventory" ||
              location === "/dashboard/driver" ? null : (
                <TableCell align="center">
                  <HeadTypography >Item name</HeadTypography>
                </TableCell>
              )}
              <TableCell align="center">
                <HeadTypography>Entry date3</HeadTypography>
              </TableCell>
              <TableCell align="center">
                <HeadTypography>ID</HeadTypography>
              </TableCell>
              {location === "/dashboard/inventory" ||
              location === "/dashboard/driver" ? null : (
                <TableCell align="center">
                  <HeadTypography>Quantity</HeadTypography>
                </TableCell>
              )}
              <TableCell align="center">
                <HeadTypography>State</HeadTypography>
              </TableCell>
            </TableRow>
          </TableHead>

          {inventory?.map((row: any, index: any) => {
            return (
              <RowData
                key={index}
                data={row}
                handleOnClick={handleOnClick || null}
              />
            );
          })}
        </Table>
      </TableContainer>
    </div>
  );
};
