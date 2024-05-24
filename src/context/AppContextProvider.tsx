import React from "react";

import User from "./User/UserContext";
import Vehicles from "./Vehicles/VehiclesContext";
import RenderDataHome from "./RenderDataScreens/RenderDataHome";
import Route from "./Route/RouteContext"

import { combineComponents } from "./combineComponents";

interface AppContextProviderProps {
  children: React.ReactNode;
}

const providers = [User, Vehicles, RenderDataHome, Route];

export const AppContextProvider: React.FC<AppContextProviderProps> =
  combineComponents(...providers);
