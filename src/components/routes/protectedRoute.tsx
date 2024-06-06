import { getLocalStorage } from "@/hooks/getLocalStorage";
import { useBoundStore } from "@/stores/index";
import { Navigate, Outlet } from "react-router-dom";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const ProtectedRoute = ({ redirectPath = "/", rol }: any) => {
  const { Authenticated } = useBoundStore();
  const vehicle = getLocalStorage("vehicle");
  const user = getLocalStorage("Parse/013/currentUser");
  if (rol === "driver" && !vehicle)
    return <Navigate to={redirectPath} replace={true} />;
  if (rol === "admin" && !user)
    return <Navigate to={redirectPath} replace={true} />;
  return <Outlet />;
};
