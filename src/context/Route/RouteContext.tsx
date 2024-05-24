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
        console.log(values, 'Registrar ruta nueva')
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