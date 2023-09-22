import { NavPage } from "@/shared/components/layout/page";

import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";
//import ramas from '@/assets/ramas.png'
export const LayoutPage: React.FC<{}> = () => {

  return (
   <>
      <NavPage />
      <Box marginTop={"7vh"} >
        <Outlet />
      </Box>
   
   </>
  );
};
//sx={{backgroundImage:`url(${ramas})`,backgroundSize:'contain'}}