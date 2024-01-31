import { Button, Typography } from "@mui/material";
import * as React from "react";

function ButtonStyles(
  width = "fit-content",
  height = "fit-content",
  color = "text.secondary",
  backgroundColor = "background.paper",
  padding = "8px 16px"
) {
  return {
    width: width,
    height: height,
    color: color,
    backgroundColor: backgroundColor,
    transition: "0.5s",
    ":hover": {
      backgroundColor: "background.default",
      color: "text.primary",
    },
    padding: padding,
    borderRadius: "10px",
  };
}

export default function ButtonPrimary(props) {
  return (
    <Button
      disabled={props.disabled}
      variant="button-primary"
      type={props.type}
      sx={ButtonStyles(
        props.width,
        props.height,
        props.color,
        props.disabled ? "#8C8C8C" : props.backgroundColor,
        props.padding
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
