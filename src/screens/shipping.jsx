import { Box, Typography, styled } from "@mui/material";
import CardVehicles from "@/components/cards/cards-vehicles";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import { useContext, useEffect, useState } from "react";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import { BranchContext } from "@/context/Branch/BranchContext";
import { useBoundStore } from "@/stores/index";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { InventoryContext } from "@/context/Inventory/InventoryContext";
import { TableDetails } from "@/components/tracking/table/table-details";
import LinearProgress from "@mui/material/LinearProgress";
import calculateVolumetric from "../utils/calculateVolumetric";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardBranchOffice from "@/components/cards/cards-branch-office";
import CardRoutesV2 from "../components/cards/cardRouteV2";
const steps = ["Select Vehicle", "Upload Product", "Dispach"];

const BoxTitle = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "flex-start",
  gap: "2.5rem",
});
const Title = styled(Typography)({
  color: "#00294F",
  fontFamily: "Jost",
  fontSize: "1.5625rem",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
});

export default function Shipping() {
  const { getAllVehicles } = useContext(VehiclesContext);
  const { getAllInventory, CreateShipping } = useContext(InventoryContext);
  const { getAllBranch, GetAllRoute } = useContext(BranchContext);

  const {
    DataPerfilVehicles,
    DataPerfilInventory,
    DataPerfilBranch,
    AllRoute,
  } = useBoundStore();

  const [loading, setLoading] = useState(true);
  const [vehicleSelect, setVehicleSelect] = useState([]);
  const [localProduct, setLocalProduct] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [shippingData, setShippingData] = useState({ product: [] });
  const [capacity, setCapacity] = useState({
    totalCapacity: 0,
    usedCapacity: 0,
    percentageCapacity: 0,
  });
  const [availableRoutes, setAvailableRoutes] = useState([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const allVehicles = async () => await getAllVehicles(1);
    allVehicles();
    const allProduct = async () => await getAllInventory(1);
    allProduct();
    const getAllRoute = async () => await GetAllRoute();
    getAllRoute();
  }, []);

  useEffect(() => {
    console.log({ AllRoute });
    if (shippingData.vehicle) {
      const dataRoute = AllRoute.filter((route) => {
        return route.vehicle.id === shippingData.vehicle.id;
      });
      setAvailableRoutes(dataRoute);
      console.log({ a: dataRoute?.[0].branch });
    }
  }, [AllRoute, shippingData.vehicle]);

  useEffect(() => {
    if (DataPerfilInventory?.length) {
      setLocalProduct(DataPerfilInventory);
    }
  }, [DataPerfilInventory]);

  const selectProduct = (data) => {
    if (data) {
      setLocalProduct([data]);
    }
  };

  const selectPlate = (data) => {
    if (data) {
      setVehicleSelect([data]);
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = (step) => {
    if (step === 1) {
      setActiveStep(1);
      return;
    }
    if (step === 2 && capacity.usedCapacity > 0) {
      setActiveStep(2);

      return;
    }
    window.alert("Tenes que cargar algo perrriiuuu");
  };

  const selectShippingVehicle = (data) => {
    setShippingData({ ...shippingData, vehicle: data });
    handleNext(1);
    const dataCapacity = data?.attributes?.capacity;
    setCapacity({ ...capacity, totalCapacity: dataCapacity });
    console.log(data);
  };

  const selectShippingProduct = (data) => {
    const productData = data.attributes;
    const { height, weight, productLength } = productData;
    const useCapacity = calculateVolumetric({ height, weight, productLength });
    const totalUseCapacity = capacity.usedCapacity + useCapacity;
    const percentageUsedCapacity =
      (totalUseCapacity / capacity.totalCapacity) * 100;
    if (percentageUsedCapacity <= 100) {
      setLocalProduct(
        localProduct?.filter((product) => product?.id !== data?.id)
      );
      setCapacity({
        ...capacity,
        usedCapacity: totalUseCapacity,
        percentageCapacity: Math.ceil(percentageUsedCapacity),
      });
      const productChange = shippingData.product.concat(data);
      setShippingData({ ...shippingData, product: productChange });

      console.log(productData, useCapacity);
      return;
    }
    window.alert("Te pasaste de rosca perri");
  };

  const selectRouter = (data) => {
    setShippingData({ ...shippingData, route: data });
    console.log({ ...shippingData, route: data });
  };

  const createOrder = () => {
    const formatData = {
      productId: shippingData.product.map((po) => {
        return po.id;
      }),
      vehicleId: shippingData.vehicle.id,
      routeId: shippingData.route.id,
      inventoryCoD: "string",
      entryDate: new Date()
        .toLocaleString("es-AR", { hour12: false })
        .replace(",", ""),
      deliveryDate: "",
      status: "programado",
    };
    console.log({ formatData });
    CreateShipping(formatData);
  };

  return (
    <Box
      sx={{
        p: { xs: "20px", sm: "20px 50px" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="subtitle1" color="text.fourth">
        Shipping
      </Typography>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit">{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      {activeStep === 1 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "60%", display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "90%" }}>
              <LinearProgress
                variant="determinate"
                value={capacity.percentageCapacity}
              />
            </Box>
            <Box sx={{ width: "10%", padding: "10px" }}>
              <Typography>{`${capacity.percentageCapacity}%`}</Typography>
            </Box>
          </Box>
        </Box>
      )}
      {activeStep !== 2 && (
        <InputSearchGlobal
          handleClick={activeStep === 0 ? selectPlate : selectProduct}
          type={activeStep === 0 ? "vehicle" : "route"}
        />
      )}
      {activeStep === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "start" },
          }}
        >
          {loading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100px",
                width: "100%",
              }}
            >
              {/** */}
            </Box>
          )}
          {DataPerfilVehicles?.length === 0 &&
            !loading &&
            !vehicleSelect.length && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "10rem",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontSize: "20px !important" }}
                >
                  Vehicles not found
                </Typography>
              </Box>
            )}
          {!vehicleSelect.length &&
            DataPerfilVehicles?.map((DataPerfilVehicles) => {
              // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
              return (
                // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                <div
                  key={DataPerfilVehicles.id}
                  onClick={() => handleVehicleClick(DataPerfilVehicles)}
                >
                  <CardVehicles
                    DataPerfilVehicles={DataPerfilVehicles}
                    handleOnClick={selectShippingVehicle}
                  />
                </div>
              );
            })}

          {!!vehicleSelect.length && (
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            // biome-ignore lint/complexity/useLiteralKeys: <explanation>
            <div
              key={vehicleSelect?.[0].id}
              onClick={() => handleVehicleClick(vehicleSelect?.[0])}
            >
              <CardVehicles
                DataPerfilVehicles={vehicleSelect?.[0]}
                handleOnClick={selectShippingVehicle}
              />
            </div>
          )}
        </Box>
      )}
      {activeStep === 1 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            <TableDetails
              inventory={localProduct}
              handleOnClick={selectShippingProduct}
            />
          </Box>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <div style={{ color: "white", fontSize: "1.2rem" }}>
                  {" "}
                  Products Loaded
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", sm: "start" },
                  }}
                >
                  <TableDetails
                    inventory={shippingData.product}
                    handleOnClick={selectShippingProduct}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={() => handleNext(2)} sx={{ mr: 1 }}>
                  Next
                </Button>
              </Box>
            </>
          </div>
        </>
      )}
      {activeStep === 2 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            {/* <TableDetails
              inventory={localProduct}
              handleOnClick={selectShippingProduct}
            /> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3.3125rem",
            }}
          >
            <BoxTitle>
              <Title>Route</Title>
            </BoxTitle>
            <Box sx={{ width: "100%" }}>
              {availableRoutes.map((route) => {
                return (
                  <CardRoutesV2 data={route} handleOnclick={selectRouter} />
                );
              })}
            </Box>
          </Box>
          <div>
            <>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={() => createOrder()} sx={{ mr: 1 }}>
                  back
                </Button>
              </Box>
            </>
          </div>
        </>
      )}
    </Box>
  );
}
