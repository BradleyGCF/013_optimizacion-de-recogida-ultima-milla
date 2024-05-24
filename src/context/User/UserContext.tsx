import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";

import { useBoundStore } from "@/stores/index";

type UserContextType = {
  LoginMail: (values: any) => void;
  SettingsUser: (userAddress: string) => Promise<void>;
  LogoutFunc: () => Promise<void>;
  GetAllUser: () => Promise<void>;
  GetAllSearchBarOption: (
    value: "vehicle" | "branch" | "product"
  ) => Promise<void>;
} | null;

export const UserContext = createContext<UserContextType>(null);

const UserState = (props: { children: any }) => {
  const { logout, enableWeb3, authenticate } = useMoralis();
  const { user } = useMoralis();
  // const userAddress = user!.get("ethAddress");

  const {
    DataPerfilUser,
    User,
    Authenticated,
    setDataPerfilUser,
    setUser,
    setAuthenticated,
    setGetAllUsers,
    setSearchBarOption,
  } = useBoundStore();

  const LoginMail = async (values: any) => {
    try {
      const res = await Moralis.User.logIn(values.username, values.password);
      if (res.id) {
        const userId = await Moralis.Cloud.run("getUserById", {
          userId: res.id,
        });
        setAuthenticated(true);
        setUser(userId);
        return {
          ok: true,
          admin: userId.user.attributes.type_user,
        };
      }
      return;
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObjeto = JSON.parse(errorMessage);
      console.error("🚀 error de login", errorMessage);
    }
  };

  const GetAllUser = async () => {
    try {
      const res = await Moralis.Cloud.run("getAllUsers");
      setGetAllUsers(res.users);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error("🚀 error al traer todos los usuarios", error);
    }
  };

  const SettingsUser = async (userAddress: string) => {
    try {
      const SetSettingsUser = await Moralis.Cloud.run("SetSettingsUser", {
        owner: userAddress,
      });
    } catch (error: any) {
      console.error("🚀 error de SettingsUser", error);
    }
  };

  const LogoutFunc = async () => {
    localStorage.removeItem("Parse/023/currentUser");
    await logout();
    setAuthenticated(false);
    setUser([]);
    location.reload();
  };

  const GetAllSearchBarOption = async (
    value: "vehicle" | "branch" | "product"
  ) => {
    try {
      if (value === "vehicle") {
        const res = await Moralis.Cloud.run("getAllVehicle", {});
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const newOptions = res.data?.map((PerfilVehicles: any) => {
          const vehicle = {
            id: PerfilVehicles?.id,
            label: PerfilVehicles?.attributes?.plate,
            data: PerfilVehicles,
          };
          return vehicle;
        });
        setSearchBarOption(newOptions);
      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error("🚀 error al obtener todos los vehiculos", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        LoginMail,
        SettingsUser,
        LogoutFunc,
        GetAllUser,
        GetAllSearchBarOption,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
