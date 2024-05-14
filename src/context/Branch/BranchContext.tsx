import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";

import { useBoundStore } from "@/stores/index";

type BranchContextType = {
  RegisterBranch: (values: any) => void;
  getAllBranch: () => Promise<void>;
} | null;

export const BranchContext = createContext<BranchContextType>(null);

async function assignRoleToVehicles(vehivlesId: string, roleName: string) {
  try {
    // Llamar a la función de nube en Moralis
    const result = await Moralis.Cloud.run("assignRoleToUser", {
      vehivlesId,
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

    if (result && result.hasRole) {
      console.log(`El usuario actual tiene el rol '${roleName}'.`);
      return result.hasRole;
    } else {
      console.log(`El usuario actual NO tiene el rol '${roleName}'.`);
      return result.hasRole;
    }
  } catch (error) {
    console.error("Error al verificar el rol:", error);
  }
}

const BranchState = (props: { children: any }) => {
  const { setDataPerfilVehicles, Vehicles, setVehicles } = useBoundStore();

  const RegisterBranch = async (values: any) => {
    console.log(values, "REGISTER BRANCH");
    try {
      const res = await Moralis.Cloud.run("createBranch", {
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

  const getAllBranch = async () => {
    try {
      const res = await Moralis.Cloud.run("getAllBranch", {
        page: "1",
      });
      console.log(res, "GETALLBranch");
      setDataPerfilVehicles(res);
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
    <BranchContext.Provider
      value={{
        RegisterBranch,
        getAllBranch,
        // LogoutFunc,
      }}
    >
      {props.children}
    </BranchContext.Provider>
  );
};

export default BranchState;
