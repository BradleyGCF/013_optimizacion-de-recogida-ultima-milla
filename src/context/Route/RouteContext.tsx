import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/stores/index";

type RouteContextType = {
   createNewRoute: (values: any) => void
} | null



export const RouteContext = createContext<RouteContextType>(null);


const RouteState = (props: { children: any }) => {

   const createNewRoute = async (values: any) => {
      try {
         const res = await Moralis.Cloud.run("createRoute", {
            objectData: {
               startingPoint: {
                  latitude: '34.25',
                  longitude: '119.41'
               },
               vehicle: values.vehicle,
               branch: values.branches[0],
               state: 'programado',
               products: ['Sin productos 1', 'Sin productos 2']
            }
         })
         console.log(res)
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <RouteContext.Provider
         value={{
            createNewRoute
         }}
      >
         {props.children}
      </RouteContext.Provider>
   );
};

export default RouteState;