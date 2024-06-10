import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: React.ReactNode;
  active?: boolean;
};

export default function CardLink(props: Props) {
  return (
    <Card
      sx={{
        height: "300px",
        backgroundColor: "background.default",
        boxShadow: "-2px 11px 18px #0062bc38",
        borderRadius: "10px",
      }}
    >
      <Link
        to={props.to}
        style={{
          textDecoration: "none",
          color: "#0062bc",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            color: "text.fourth",
            fontWeight: 600,
            fontSize: 20,
            overflowWrap: "break-word",
            textAlign: "center",
          }}
        >
          {props.children}
        </Typography>
        {!props.active && (
          <Typography
            sx={{ color: "text.third", textAlign: "center", fontWeight: 600 }}
          >
          </Typography>
        )}
      </Link>
    </Card>
  );
}
