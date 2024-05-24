import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";
import { getWeight } from "@/hooks/getWeight";
import { useBoundStore } from "@/stores/index";

type InventoryContextType = {
  RegisterInventory: (values: any, index: number) => void;
  getAllInventory: (page: number) => Promise<void>;
  getAllInventorySearch: () => Promise<void>;
  getInventoryId: (value: string) => Promise<void>;
  upDataInventory: (id: string, values: any) => Promise<void>;
} | null;

export const InventoryContext = createContext<InventoryContextType>(null);

const InventoryState = (props: { children: any }) => {
  const { setDataPerfilInventory, setInventory, setDataInventorySearch } =
    useBoundStore();

  const RegisterInventory = async (values: any, volumetricWeight: number) => {
    console.log(volumetricWeight, "REGISTER SUCURSAL");
    try {
      // const volumetricWeight = getWeight(
      //   values.width,
      //   values.height,
      //   values.length
      // );
      // console.log(volumetricWeight, "VOLUMETRICO");

      const res = await Moralis.Cloud.run("createProduct", {
        objectData: {
          name: "Product",
          inventoryId: 2,
          entryDate: values.date,
          amount: "100",
          weight: values.width.toString(),
          height: values.height,
          productLength: values.length,
          volumetricWeight,
          branch: values.branch,
        },
      });
      console.log(res, "Vehicles LOGIN");
      if (res?.status === "success") {
        setInventory({ ...res.data.attributes, object: res.data.id });
        return { ok: true };
      }
      return { ok: false };
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObjeto = JSON.parse(errorMessage);
      console.error("🚀 error de registro", errorMessage);
    }
  };

  const getInventoryId = async (id: string) => {
    try {
      const res = await Moralis.Cloud.run("getInventoryByIdOrName", {
        objectId: id,
      });
      setInventory(res.data[0].attributes);
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  const upDataInventory = async (id: string, values: any) => {
    try {
      const resId = await Moralis.Cloud.run("getInventoryByIdOrName", {
        objectId: id,
      });
      const obj = {
        InventoryImage:
          values?.fileigmInventoryoffice ||
          resId.data.attributes?.InventoryImage ||
          "",
        name: values?.fullname || resId.data[0].attributes.name,
        direction: values?.address || resId.data[0].attributes.direction,
        city: values?.city || resId.data[0].attributes.city,
        country: values?.country || resId.data[0].attributes.country,
        // manager: values?.manager,
      };
      const res = await Moralis.Cloud.run("updateInventory", {
        objectData: obj,
        InventoryId: id,
      });
      console.log(res, "RESPONSE UPDATA");
      // setInventory({ objectId: res.data.id, ...res.data.attributes });
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  const getAllInventory = async (page: number) => {
    try {
      const res = await Moralis.Cloud.run("getAllProduct", {
        page,
      });
      setDataPerfilInventory(res.product);
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  const getAllInventorySearch = async () => {
    try {
      const res = await Moralis.Cloud.run("getAllInventory", {
        page: "1",
      });
      setDataInventorySearch(res.data);
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  return (
    <InventoryContext.Provider
      value={{
        RegisterInventory,
        getAllInventory,
        getAllInventorySearch,
        getInventoryId,
        upDataInventory,
      }}
    >
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryState;
