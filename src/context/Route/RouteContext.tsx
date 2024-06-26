import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/stores/index";

export type RouteContextType = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createNewRoute: (values: any) => void;
} | null;

export const RouteContext = createContext<RouteContextType>(null);
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const RouteState = (props: { children: any }) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const createNewRoute = async (values: any) => {
    console.log("REGISTER ROUTE", values);
    try {
      const res = await Moralis.Cloud.run("createRoute", {
        objectData: {
          startingPoint: {
            latitude: values.startingPoint.lat,
            longitude: values.startingPoint.lon,
          },
          endingPoint: {
            latitude: values.endingPoint.lat,
            longitude: values.endingPoint.lon,
          },
          vehicle: values.vehicle,
          branch: values.branches,
          state: "programado",
          products: ["Producto 1", "Producto 2"],
        },
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RouteContext.Provider
      value={{
        createNewRoute,
      }}
    >
      {props.children}
    </RouteContext.Provider>
  );
};

export default RouteState;
