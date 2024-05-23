import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/stores/index";

type VehiclesContextType = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RegisterVehicles: (values: any) => void;
  getAllVehicles: () => Promise<void>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  UpdateVehicle: (objectId: string, objectData: any) => Promise<void>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  IdGetVehicle: (objectId: string) => Promise<void>;
  // DataGetVehicle: (objectData: string) => Promise<void>;
  LoginVehicles: (values: any) => void;
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
  const {
    setDataPerfilVehicles,
    setGetDataVehicle,
    setUploadVehicle,
    setAuthenticated,
    setGetData,
    setVehicles,
  } = useBoundStore();

  const LoginVehicles = async (values: any) => {
    console.log(values, "REGISTER VEHICLES");
    try {
      const res = await Moralis.Cloud.run("getVehicleByPlateAndCode", {
        plate: values.username,
        code: values.password,
      });
      console.log(res, "Vehicles LOGIN");
      if (res.status !== "error") {
        setAuthenticated(true);
        setDataPerfilVehicles(res.data);
        return { ok: true, admin: false, id: res.data[0].id };
      }
      return { ok: false, admin: false };
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObjeto = JSON.parse(errorMessage);
      console.error("🚀 error de login", errorMessage);
    }
  };

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
      console.error("🚀 error al obtener todos los vehiculos", error);
    }
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const UpdateVehicle = async (objectId: string, objectData: any) => {
    try {
      const res = await Moralis.Cloud.run("updateVehicle", {
        objectId,
        objectData,
      });
      console.log(res.data, "Vehicle updated successfully");
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const IdGetVehicle = async (objectId: string) => {
    try {
      const res = await Moralis.Cloud.run("getVehicleByIdOrPlate", {
        objectId,
      });
      console.log(res.data, "datos del vehiculo obtenidos correctamente");
      setGetDataVehicle(res.data);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  return (
    <VehiclesContext.Provider
      value={{
        RegisterVehicles,
        getAllVehicles,
        UpdateVehicle,
        IdGetVehicle,
        LoginVehicles,
        // DataGetVehicle,
        // LogoutFunc,
      }}
    >
      {props.children}
    </VehiclesContext.Provider>
  );
};

export default VehicleState;
