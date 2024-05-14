import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";

import { useBoundStore } from "@/stores/index";
import { object } from "yup";

type BranchContextType = {
  RegisterBranch: (values: any) => void;
  getAllBranch: () => Promise<void>;
  getAllBranchSearch: () => Promise<void>;
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
  const { setDataPerfilBranch, setBranch, setDataBranchSearch } =
    useBoundStore();

  const RegisterBranch = async (values: any) => {
    console.log(values, "REGISTER SUCURSAL");
    try {
      const res = await Moralis.Cloud.run("createBranch", {
        objectData: {
          branchImage: values.brachaImage,
          name: values.fullname,
          direction: values.address,
          city: values.city,
          country: values.country,
          manager: values.manager,
        },
      });
      console.log(res.data.id, "Vehicles LOGIN");
      if (res?.status === "success") {
        setBranch({ ...res.data.attributes, object: res.data.id });
        return { ok: true };
      }
      return { ok: false };
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObjeto = JSON.parse(errorMessage);
      console.error("🚀 error de registro", errorMessage);
    }
  };

  const getAllBranch = async () => {
    try {
      const res = await Moralis.Cloud.run("getAllBranch", {
        page: "1",
      });
      setDataPerfilBranch(res.data);
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  const getAllBranchSearch = async () => {
    try {
      const res = await Moralis.Cloud.run("getAllBranch", {
        page: "1",
      });
      setDataBranchSearch(res.data);
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  return (
    <BranchContext.Provider
      value={{
        RegisterBranch,
        getAllBranch,
        getAllBranchSearch,
      }}
    >
      {props.children}
    </BranchContext.Provider>
  );
};

export default BranchState;
