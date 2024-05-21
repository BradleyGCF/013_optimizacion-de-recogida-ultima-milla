import React from "react";

import User from "./User/UserContext";
import Vehicles from "./Vehicles/VehiclesContext";
import Branch from "./Branch/BranchContext";
import Inventory from "./Inventory/InventoryContext";
import RenderDataHome from "./RenderDataScreens/RenderDataHome";

import { combineComponents } from "./combineComponents";

interface AppContextProviderProps {
  children: React.ReactNode;
}

const providers = [User, Vehicles, Branch, Inventory, RenderDataHome];

export const AppContextProvider: React.FC<AppContextProviderProps> =
  combineComponents(...providers);
