const theme = (themeModeState) => ({
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1800,
    },
  },
  typography: {
    fontFamily: ["Jost"].join(","),
    button: {
      fontWeight: "500",
      "@media (min-width:0px)": {
        fontSize: "10px",
      },
      "@media (min-width:600px)": {
        fontSize: "12px",
      },
      "@media (min-width:900px)": {
        fontSize: "12px",
      },
      "@media (min-width:1200px)": {
        fontSize: "13px",
      },
      "@media (min-width:1800px)": {
        fontSize: "14px",
      },
    },
    h1: {
      fontWeight: "800",
      "@media (min-width:0px)": {
        fontSize: "20px",
      },
      "@media (min-width:600px)": {
        fontSize: "24px",
      },
      "@media (min-width:900px)": {
        fontSize: "24px",
      },
      "@media (min-width:1200px)": {
        fontSize: "40px",
      },
      "@media (min-width:1800px)": {
        fontSize: "45px",
      },
    },
    h2: {
      fontWeight: "600",
      "@media (min-width:0px)": {
        fontSize: "25px",
      },
      "@media (min-width:600px)": {
        fontSize: "28px",
      },
      "@media (min-width:900px)": {
        fontSize: "31px",
      },
      "@media (min-width:1200px)": {
        fontSize: "34px",
      },
      "@media (min-width:1800px)": {
        fontSize: "37px",
      },
    },
    h3: {
      fontWeight: "700",
      "@media (min-width:0px)": {
        fontSize: "25px",
      },
      "@media (min-width:600px)": {
        fontSize: "12px",
      },
      "@media (min-width:900px)": {
        fontSize: "20px",
      },
      "@media (min-width:1200px)": {
        fontSize: "20px",
      },
      "@media (min-width:1800px)": {
        fontSize: "25px",
      },
    },
    h4: {
      fontWeight: "600",
      "@media (min-width:0px)": {
        fontSize: "15px",
      },
      "@media (min-width:600px)": {
        fontSize: "17px",
      },
      "@media (min-width:900px)": {
        fontSize: "20px",
      },
      "@media (min-width:1200px)": {
        fontSize: "20px",
      },
      "@media (min-width:1800px)": {
        fontSize: "25px",
      },
    },
    subtitle1: {
      fontWeight: "600",
      "@media (min-width:0px)": {
        fontSize: "13px",
      },
      "@media (min-width:600px)": {
        fontSize: "15px",
      },
      "@media (min-width:900px)": {
        fontSize: "22px",
      },
      "@media (min-width:1200px)": {
        fontSize: "25px",
      },
      "@media (min-width:1800px)": {
        fontSize: "25px",
      },
    },
  },
  palette: {
    action: {
      disabled: "#FFFFFF",
    },
    mode: themeModeState,
    ...(themeModeState == "light"
      ? {
          background: {
            default: "#FFFFFF",
            paper: "#00294F",
          },
          text: {
            primary: "#3B3B3B",
            secondary: "#FFFFFF",
            third: "#8692a6",
            fourth: "#00294F",
          },
          icon: {
            primary: "#3B3B3B",
            secondary: "#FFFFFF",
            third: "#8692a6",
          },
        }
      : {
          background: {
            default: "#00294F",
            paper: "#FFFFFF",
          },
          text: {
            primary: "#FFFFFF",
            secondary: "#3B3B3B",
            third: "#8692a6",
            fourth: "#00294F",
          },
          icon: {
            primary: "#FFFFFF",
            secondary: "#3B3B3B",
            third: "#8692a6",
          },
        }),
  },
});

export default theme;
