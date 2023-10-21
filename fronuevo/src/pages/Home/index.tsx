import { Footer } from "@/shared/components/footer/Footer";
import { NavPage } from "@/shared/components/layout/page";

import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";
//import ramas from '@/assets/ramas.png'
 const LayoutPage: React.FC<{}> = () => {

  return (
   <>
      <NavPage />
      <Box marginTop={"7vh"} >
        <Outlet />
      </Box>

      <Footer/>
   </>
  );
};
export default LayoutPage
//sx={{backgroundImage:`url(${ramas})`,backgroundSize:'contain'}}