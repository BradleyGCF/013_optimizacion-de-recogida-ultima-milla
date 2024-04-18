import AreaChart from "@/components/chart/AreaChart";
import { Box } from "@mui/material";


export default function Inventory(){
    return(
        <Box
            sx={{
                backgroundColor: '#00294F'
            }}
        >
            <AreaChart />
        </Box>
    )
}