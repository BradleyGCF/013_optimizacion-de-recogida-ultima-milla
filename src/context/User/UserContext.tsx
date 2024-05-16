import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";

import { useBoundStore } from "@/stores/index";

type UserContextType = {
  LoginMail: (values: any) => void;
  SettingsUser: (userAddress: string) => Promise<void>;
  LogoutFunc: () => Promise<void>;
} | null;

export const UserContext = createContext<UserContextType>(null);

async function assignRoleToUser(userId: string, roleName: string) {
  try {
    // Llamar a la función de nube en Moralis
    const result = await Moralis.Cloud.run("assignRoleToUser", {
      userId,
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

const UserState = (props: { children: any }) => {
  const { logout, enableWeb3, authenticate } = useMoralis();
  const { user } = useMoralis();
  // const userAddress = user!.get("ethAddress");

  const { setUser, setAuthenticated } = useBoundStore();

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
    console.log("ENTRE");
    localStorage.removeItem("Parse/023/currentUser");
    await logout();
    setAuthenticated(false);
    setUser([]);
    location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        LoginMail,
        SettingsUser,
        LogoutFunc,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
