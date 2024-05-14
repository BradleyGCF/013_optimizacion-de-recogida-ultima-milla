import React from "react";

import User from "./User/UserContext";
import Vehicles from "./Vehicles/VehiclesContext";
import Branch from "./Branch/BranchContext";
import RenderDataHome from "./RenderDataScreens/RenderDataHome";

import { combineComponents } from "./combineComponents";

interface AppContextProviderProps {
  children: React.ReactNode;
}

const providers = [User, Vehicles, Branch, RenderDataHome];

export const AppContextProvider: React.FC<AppContextProviderProps> =
  combineComponents(...providers);
