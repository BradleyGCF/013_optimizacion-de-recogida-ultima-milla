import AreaChart from "@/components/chart/AreaChart";
import { Box, Button, Typography } from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useNavigate } from "react-router-dom";
import { TableDetails } from "@/components/tracking/table/table-details";


const TypographyStyled = {
    color: "var(--Color-primario, #00294F)",
    fontFamily: "Jost",
    fontSize: "1.3625rem",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
}


export default function Inventory() {

    const nav = useNavigate()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3
            }}
        >
            <Box
                onClick={() => nav(-1)}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    width: '145px',
                    cursor: 'pointer'
                }}
            >
                <ArrowLeftIcon fontSize="large" />
                <Typography
                    sx={TypographyStyled}
                >
                    Inventory
                </Typography>
            </Box>

            <Typography
                sx={TypographyStyled}
            >
                Inventory overview
            </Typography>

            <Box
                sx={{
                    backgroundColor: '#00294F',
                }}
            >
                <AreaChart />
            </Box>

            <TableDetails />

            <Box display='flex' justifyContent='center' alignItems='center'>
                <Button 
                    variant='contained'
                    sx={{
                        color: '#fff',
                        width: '524px',
                        backgroundColor: '#0062BC',
                        borderRadius: '10px',
                        padding: '8px 16px',
                        textTransform: 'capitalize'
                    }}
                >
                    Add new item
                </Button>
            </Box>
        </Box>
    )
}