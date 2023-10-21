/* eslint-disable react-refresh/only-export-components */

import LayoutPage from "@/pages/Home";
import { Inicio_Pagina } from "@/pages/Inicio";
import Login from "@/pages/Login";
import { AuthGuard } from "@/shared/components/guards";
import { RoutesNotFound } from "@/shared/utils/routesNotFound";
import { Box, CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { PrivateRoutes } from "./routes";
import { Nosotros } from "@/pages/nosotros";
import { Contactto } from "@/shared/components/layout/page/Contacto/Contactto";

//const Login = lazy(() => import("@/pages/Login/index"));
const Private = lazy(() => import("@/private/routes"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      }
    >
      <BrowserRouter>
        <RoutesNotFound>
          <Route path="/*" element={<LayoutPage/>} >
            
          <Route path="login" element={<Login/>} />
          <Route path="inicio" element={<Inicio_Pagina/>} />
          <Route path="nosotros" element={<Nosotros/>} />
          <Route path="contactanos" element={<Contactto/>} />

          
          </Route>
          
       

          <Route element={<AuthGuard />}>
            <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} >
           
            </Route>
          </Route>
          
        </RoutesNotFound>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
//        <LayoutPage />
/*
  <Route element={<AuthGuard />}>
            <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
          </Route>*/