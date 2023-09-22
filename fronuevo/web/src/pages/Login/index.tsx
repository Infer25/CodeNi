import logo from '@/assets/logoy.jpeg';
import {
  Avatar,
  Box,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export const Login: React.FC<{}> = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const goToSistema= ()=>{
    navigate("/sistema");
  }
  return (
    <Box
      sx={{
        display: "Flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
       // backgroundImage:`url(${granos})`,
      //  backgroundRepeat:'no-repeat',
        //backgroundSize:'cover'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
          padding: 2,
          gap: 5,
          minWidth: "350px",
          minHeight:'500px',
          // backgroundImage:`url(${fomdo})`,
          textAlign: "center",
         bgcolor:theme.palette.common.white,

        }}
      >
     
        <Avatar
          src={logo}
          sx={{ alignSelf: "center", height: "150px", width: "150px"}}
        />
        <TextField id="email" label="Usuario" variant="outlined" size="small"    autoComplete="off"/>
        <TextField
          id="pass"
          label="Contraseña"
          variant="outlined"
          size="small"
          autoComplete="off"
        />
        <Button
          variant="contained"
          sx={{ bgcolor:theme.palette.primary.light,width:'200px',alignSelf:'center'}}
          size="medium"
          color="primary"
          onClick={goToSistema}
          fullWidth
        >
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  );
};
