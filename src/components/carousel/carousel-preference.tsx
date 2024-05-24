import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ButtonPrimary from "@/components/buttons/button-primary";
import React, { useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import { useBoundStore } from "@/stores/index";

const CustomButtonGroup = ({
  next,
  previous,
}: {
  next: () => void;
  previous: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        top: "45%",
        left: { xs: "-5%", sm: "-1%", lg: "0%" },
        right: { xs: "-5%", sm: "-1%", lg: "0%" },
      }}
    >
      <KeyboardArrowLeftIcon
        sx={{
          color: "#6969",
          fontSize: { xs: 35, sm: 32, md: 30 },
        }}
        onClick={() => previous()}
        style={{ cursor: "pointer" }}
      />
      <KeyboardArrowRightIcon
        sx={{
          color: "#6969",
          fontSize: { xs: 35, sm: 32, md: 30 },
        }}
        onClick={() => next()}
        style={{ cursor: "pointer" }}
      />
    </Box>
  );
};

const mockData = [
  {
    id: 1,
    name: "Jane Doe",
    img: "https://res.cloudinary.com/dge3tzzsh/image/upload/v1714507579/gravitad_general/022-assets/perrito-compra-finalizada_uzebyv.webp",
  },
  {
    id: 2,
    name: "Jhon Doe",
    img: "https://res.cloudinary.com/dge3tzzsh/image/upload/v1714055167/gravitad_general/022-assets/login-4_m5qjxr.png",
  },
  {
    id: 3,
    name: "Jhon Doe Second",
    img: "https://res.cloudinary.com/dge3tzzsh/image/upload/v1714055167/gravitad_general/022-assets/login-5_u6eet8.png",
  },
  {
    id: 4,
    name: "Jane Doe Second",
    img: "https://res.cloudinary.com/dge3tzzsh/image/upload/v1713988071/gravitad_general/022-assets/login-3_unzik4.png",
  },
  {
    id: 5,
    name: "Jhon Doe Second",
    img: "https://res.cloudinary.com/dge3tzzsh/image/upload/v1713988071/gravitad_general/022-assets/login-2_qlfaqt.png",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1900 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1900, min: 1400 },
    items: 3,
  },
  laptop: {
    breakpoint: { max: 1400, min: 900 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

export default function CarouselPreference({}) {
  const [check, setCheck] = useState<any>();
  const [driver, setDriver] = useState<number | null>();
  const { DataPerfilVehicles } = useBoundStore();

  const handleClick = (value: string) => {
    setCheck(value);
  };

  return (
    <Box
      sx={{
        maxWidth: {
          xs: "320px",
          sm: "500px",
          md: "780px",
          lg: "900px",
        },
        height: "400px",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        m: "auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
        p: "auto",
        gap: "3rem",
      }}
    >
      <Typography
        sx={{
          "&.MuiTypography-root": {
            fontFamily: "Jost",
            fontSize: "25px",
            fontWeight: 600,
            color: "#0062BC",
          },
        }}
      >
        Who will drive today?
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          width: "20rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.6875rem",
            height: DataPerfilVehicles.length > 0 ? "200px" : "none",
            overflowY: "auto",
          }}
        >
          {DataPerfilVehicles?.length === 0 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Typography>Driver not found</Typography>
            </Box>
          )}
          {DataPerfilVehicles?.length > 0 &&
            DataPerfilVehicles.map((data: any, index: any) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    padding: ".5rem",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3rem",
                    borderRadius: "0.625rem",
                    border: `${check === index ? "4px solid #0062BC" : ""}`,
                    boxShadow: "-2px 11px 18px #0062bc38",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick(index)}
                >
                  {check === index ? (
                    <RadioButtonCheckedOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#0062BC" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      fontSize="small"
                      sx={{ color: "#0062BC" }}
                    />
                  )}

                  <Typography
                    sx={{
                      color: "#00294F",
                      fontFamily: "Jost",
                      fontSize: "1.25 rem !important",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                    }}
                  >
                    {data?.attributes?.name
                      ? data?.attributes?.name
                      : "Nombre del conductor"}
                  </Typography>
                </Box>
              );
            })}
        </Box>
        {/* CAROUSEL */}
      </Box>
      <ButtonPrimary width="300px" disabled={check == null}>
        Select
      </ButtonPrimary>
    </Box>
  );
}

{
  /* <Carousel
          renderButtonGroupOutside={true}
          arrows={false}
          responsive={responsive}
          showDots={true}
          itemClass="carousel-item-padding-0-px"
        >
          {mockData.map((data, index) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={data.img}
                  sx={{
                    height: "200px",
                    width: "200px",
                    my: 3,
                    mx: { lg: 2, md: 1, sm: 1 },
                    borderRadius: "10px",
                    objectFit: "cover",
                    boxShadow: "0px 4px 4px 0px rgba(127, 132, 233, 0.25)",
                    border: driver == index ? "9px solid #0062BC" : "none",
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => setDriver(index)}
                />
              </Box>
            );
          })}
        </Carousel>  */
}
