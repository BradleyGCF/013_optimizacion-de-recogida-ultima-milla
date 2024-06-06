import React from "react";
import Maps from "./maps";
import {
  Box,
  StepLabel,
  Stepper,
  Step,
  StepContent,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { TypographyStyled } from "../screens/inventory";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    label: "Starting point",
  },
  {
    label: "Destination",
  },
];

const GPS = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const nav = useNavigate();

  return (
    <div>
      <Box
        onClick={() => nav(-1)}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          width: "145px",
          cursor: "pointer",
        }}
      >
        <ArrowLeftIcon fontSize="large" />
        <Typography sx={TypographyStyled}>GPS</Typography>
      </Box>

      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">p</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.label}</Typography>
                {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                <Box sx={{ mb: 2 }}></Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Maps />
    </div>
  );
};

export default GPS;
