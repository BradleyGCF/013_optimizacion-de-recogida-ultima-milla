import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const DataTypography = styled(Typography)({
  color: "var(--Color-primario, #00294F)",
  fontFamily: "Jost",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
});

export const RowData = ({ data, handleOnClick }: any) => {
  const location = useLocation().pathname;
  return (
    <>
      <TableBody sx={{ backgroundColor: "white" }}>
        <TableRow
          onClick={() => {
            if (handleOnClick) {
              handleOnClick(data);
            }
          }}
        >
          {location === "/dashboard/inventory" ||
          location === "/dashboard/driver" ? null : (
            <TableCell align="center">
              <DataTypography>
                {data?.attributes?.name || data?.name}
              </DataTypography>
            </TableCell>
          )}
          <TableCell align="center">
            <DataTypography>
              {data?.attributes?.entryDate
                ? data?.attributes.entryDate
                : data?.entryDate}
            </DataTypography>
          </TableCell>
          <TableCell align="center">
            <DataTypography>
              {data?.id ? data.id : data?.objectId}
            </DataTypography>
          </TableCell>
          {location === "/dashboard/inventory" ||
          location === "/dashboard/driver" ? null : (
            <TableCell align="center">
              <DataTypography>
                {data?.attributes?.productLength
                  ? data?.attributes.productLength
                  : data.productLength}
              </DataTypography>
            </TableCell>
          )}
          <TableCell align="center">
            <DataTypography>
              {data?.attributes?.status || data?.status || "programado"}
            </DataTypography>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};
