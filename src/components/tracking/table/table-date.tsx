import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

const HeadTypography = styled(Typography)({
  color: "var(--Color-primario, #00294F)",
  fontFamily: "Jost",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
});

const DateTypography = styled(Typography)({
  color: "var(--Color-primario, #00294F)",
  fontFamily: "Jost",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
});

const UbicationButton = styled(Button)({
  display: "flex",
  padding: "0.5rem",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  color: "#FFF",
  fontFamily: "Jost",
  fontSize: "1.25rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
});

export const TableDate = ({ card }: any) => {
  const navigate = useNavigate();
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody sx={{ backgroundColor: "white" }}>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <HeadTypography>Exit</HeadTypography>
              </TableCell>
              <TableCell align="center">
                <HeadTypography>Current location</HeadTypography>
              </TableCell>
              <TableCell align="center">
                <HeadTypography>Approximate arrival</HeadTypography>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody sx={{ backgroundColor: "white" }}>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <DateTypography>Hour: 00:00 am</DateTypography>
                <DateTypography>Date:00/00/00</DateTypography>
              </TableCell>
              <TableCell align="center">
                {card.status === "programmed" && (
                  <Box
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <UbicationButton
                      sx={{
                        background: "#0062BC",
                        display: "flex",
                        flexDirection: "row",
                      }}
                      onClick={() =>
                        navigate(`/dashboard/ubication/${card.id}`)
                      }
                    >
                      Current location
                      <LocationOnIcon />
                    </UbicationButton>
                  </Box>
                )}
                {card.status === "road" && (
                  <DateTypography>On hold</DateTypography>
                )}
                {card.status === "finished" && (
                  <DateTypography>On landing</DateTypography>
                )}
              </TableCell>
              <TableCell align="center">
                <DateTypography></DateTypography>
                <DateTypography>Date:00/00/00</DateTypography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
