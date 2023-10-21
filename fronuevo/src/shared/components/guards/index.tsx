import { useAuth } from "@/shared/zustand/slice/Auth";
import { Outlet } from "react-router-dom";
import { NavPage } from "../layout/page";

export const AuthGuard = () => {
  return useAuth.getState().token ? (
    <Outlet />
  ) : (
    <>
      <NavPage />
     
    </>
  );
};
// <Navigate replace to={PublicRoutes.LOGIN} />