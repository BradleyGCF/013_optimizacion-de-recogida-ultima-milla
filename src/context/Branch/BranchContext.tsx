import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/stores/index";
import { object } from "yup";

type BranchContextType = {
  RegisterBranch: (values: any) => void;
  getAllBranch: (page: number) => Promise<void>;
  getAllBranchSearch: () => Promise<void>;
  getBranchId: (value: string) => Promise<void>;
  upDataBranch: (id: string, values: any) => Promise<void>;
  getAllBranchToVehicleUpdate: () => Promise<void>;
  GetAllRoute: () => Promise<void>;
} | null;

export const BranchContext = createContext<BranchContextType>(null);

const BranchState = (props: { children: any }) => {
  const { setDataPerfilBranch, setDataBranchSearch, setBranch, setAllRoute } =
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

  const getBranchId = async (id: string) => {
    try {
      const res = await Moralis.Cloud.run("getBranchByIdOrName", {
        objectId: id,
      });
      setBranch(res.data[0].attributes);
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  const upDataBranch = async (id: string, values: any) => {
    console.log(values, "CONTEXT");

    try {
      const resId = await Moralis.Cloud.run("getBranchByIdOrName", {
        objectId: id,
      });
      const obj = {
        branchImage:
          values?.fileigmbranchoffice ||
          resId.data.attributes?.branchImage ||
          "",
        name: values?.fullname || resId.data[0].attributes.name,
        direction: values?.address || resId.data[0].attributes.direction,
        city: values?.city || resId.data[0].attributes.city,
        country: values?.country || resId.data[0].attributes.country,
        // manager: values?.manager,
      };
      const res = await Moralis.Cloud.run("updateBranch", {
        objectData: obj,
        branchId: id,
      });
      console.log(res, "RESPONSE UPDATA");
      // setBranch({ objectId: res.data.id, ...res.data.attributes });
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  const getAllBranch = async (page: number) => {
    try {
      const res = await Moralis.Cloud.run("getAllBranch", {
        page,
      });
      setDataPerfilBranch(res.data);
    } catch (error: any) {
      console.error("🚀 error de branches", error);
    }
  };

  const getAllBranchToVehicleUpdate = async () => {
    try {
      const res = await Moralis.Cloud.run("getAllBranch", {});
      setBranch(res.data);
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

  const GetAllRoute = async () => {
    try {
      const res = await Moralis.Cloud.run("getAllRoute", {});
      setAllRoute(res.data);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error("🚀 error de branches", error);
    }
  };

  // const getAllBranch = async () => {
  //   try {
  //     const res = await Moralis.Cloud.run("getAllBranch", {});
  //     setDataBranch(res.data);
  //   } catch (error: any) {
  //     console.error("🚀 error de SettingsUser", error);
  //   }
  // };

  return (
    <BranchContext.Provider
      value={{
        RegisterBranch,
        getAllBranch,
        getAllBranchSearch,
        getBranchId,
        upDataBranch,
        getAllBranchToVehicleUpdate,
        GetAllRoute,
      }}
    >
      {props.children}
    </BranchContext.Provider>
  );
};

export default BranchState;
