import { Box, Typography } from '@mui/material';
import ChatSection from '@/components/sections/ChatSection'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import CardMaps from '@/components/cards/card-maps'
import CardVehicles from '@/components/cards/cards-vehicles';

export default function Chat() {
  return (
    <Box
      sx={{
        bgColor: "grey",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "125px",
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <ArrowLeftIcon
          sx={{
            fontSize: "50px",
          }}
        />
        <Typography
          sx={{
            color: "var(--Color-primario, #00294F)",
            fontFamily: "Jost",
            fontSize: "1.3625rem",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
          }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '125px',
                    cursor: 'pointer',
                    alignItems: 'center'
                }}
            >
                <ArrowLeftIcon
                    sx={{
                        fontSize: '50px'
                    }}
                />
                <Typography
                    sx={{
                        color: '#00294F',
                        fontFamily: "Jost",
                        fontSize: "1.3625rem",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "normal",
                    }}>
                    Chat
                </Typography>
            </Box>

            <ChatSection />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#FFF',
                    boxShadow: '0px 100px 80px 0px rgba(0, 98, 188, 0.012)'
                }}
            >
                <Typography
                    sx={{
                        color: '#00294F',
                        fontFamily: 'Jost',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: '500'
                    }}
                >Starting point - Branch A - Branch B</Typography>
            </Box>

            <CardMaps />

            <Typography
                sx={{
                    color: '#00294F',
                    fontFamily: 'Jost',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: '500'
                }}
            >
                00.00 Km total - 00.00 Km completed
            </Typography>

            <Typography
                sx={{
                    color: '#00294F',
                    fontFamily: 'Jost',
                    fontSize: '25px',
                    fontStyle: 'normal',
                    fontWeight: '600'
                }}
            >
                Assigned vehicle
            </Typography>

            <CardVehicles id={3} />
        </Box>
    )
}

