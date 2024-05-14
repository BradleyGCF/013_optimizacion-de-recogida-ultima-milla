import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";

import { useBoundStore } from "@/stores/index";

type VehiclesContextType = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RegisterVehicles: (values: any) => void;
  getAllVehicles: () => Promise<void>;
} | null;

export const VehiclesContext = createContext<VehiclesContextType>(null);

async function assignRoleToVehicles(vehiclesId: string, roleName: string) {
  try {
    // Llamar a la función de nube en Moralis
    const result = await Moralis.Cloud.run("assignRoleToUser", {
      vehiclesId,
      roleName,
    });
    console.log(result);
  } catch (error) {
    console.error("Error al asignar el rol:", error);
  }
}

async function checkUserRole(roleName: string, ethAddress: string) {
  try {
    // Llamar a la función de nube en Parse Server
    const result = await Moralis.Cloud.run("checkUserRoleFront", {
      roleName,
      ethAddress,
    });

    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (result && result.hasRole) {
      console.log(`El usuario actual tiene el rol '${roleName}'.`);
      return result.hasRole;
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      console.log(`El usuario actual NO tiene el rol '${roleName}'.`);
      return result.hasRole;
    }
  } catch (error) {
    console.error("Error al verificar el rol:", error);
  }
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const VehicleState = (props: { children: any }) => {
  const { setDataPerfilVehicles, Vehicles, setVehicles } = useBoundStore();

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const RegisterVehicles = async (values: any) => {
    console.log(values, "REGISTER VEHICLES");
    try {
      const res = await Moralis.Cloud.run("createVehicles", {
        objetData: values,
      });
      console.log(res, "Vehicles LOGIN");
      setVehicles();
      // return { ok: true }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObjeto = JSON.parse(errorMessage);
      console.error("🚀 error de login", errorMessage);
    }
  };

  const getAllVehicles = async () => {
    try {
      const res = await Moralis.Cloud.run("getAllVehicle", {
        page: "1",
      });
      console.log(res.data, "console de res getallvehicles");
      setDataPerfilVehicles(res.data);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  // const LogoutFunc = async () => {
  //   const Authenticated = true;
  //   await logout();
  //   setAuthenticated(false);
  //   setVehicles([]);
  //   location.reload();
  // };

  return (
    <VehiclesContext.Provider
      value={{
        RegisterVehicles,
        getAllVehicles,
        // LogoutFunc,
      }}
    >
      {props.children}
    </VehiclesContext.Provider>
  );
};

export default VehicleState;
