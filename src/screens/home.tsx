import CardLink from "@/components/cards/card-link";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

const routes = [
  {
    path: "/branch-office",
    text: "Branch Office",
    active: true,
  },
  {
    path: "/route-systems",
    text: "Route System",
    active: true,
  },
  {
    path: "/vehicles",
    text: "Vehicles",
    active: true,
  },
  {
    path: "/parcel-service",
    text: "Parcel Service",
    active: false,
  },
  {
    path: "/inventory",
    text: "Inventory",
    active: false,
  },
  {
    path: "/tracking",
    text: "Tracking",
    active: false,
  },
  {
    path: "/gps",
    text: "GPS",
    active: true,
  },
];

export default function Home() {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <Grid container spacing={4}>
        {routes.map((route, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardLink to={route.path} active={route.active}>
              {route.text}
            </CardLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
