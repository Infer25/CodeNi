import logo from "@/assets/logoy.jpeg";
import { ModelLogin } from "@/shared/zustand/slice/frmLogin";
import { Avatar, Box, Button, TextField, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFetchAuth } from "./query";
import { useAuth } from "@/shared/zustand/slice/Auth/index";
import { PrivateRoutes } from "@/routes/routes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
const Login: React.FC<{}> = () => {
  const setToken = useAuth((state) => state.setToken);
  const setNumColaborador = useAuth((state) => state.setNumColaborador);
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ModelLogin>();

  const { mutate: sesion } = useFetchAuth();

  const onSubmit = (data: ModelLogin) => {
    sesion(data, {
      onSuccess: (response) => {
        if (response) {
          setToken(response.token!);
          setNumColaborador(response.num_colaborador!);
          navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
        }
      },
    });
  };

  return (
    <Box
      sx={{
        display: "Flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
          padding: 2,
          gap: 5,
          minWidth: "350px",
          minHeight: "500px",
          textAlign: "center",
          bgcolor: theme.palette.common.white,
        }}
      >
        <Avatar
          src={logo}
          sx={{ alignSelf: "center", height: "150px", width: "150px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AccountCircleIcon fontSize="large" />
          <Controller
            name="usuario"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="usuario"
                label="Usuario"
                size="medium"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.usuario ? true : false}
                helperText={
                  errors.usuario ? "Por favor completar el campo" : ""
                }
                type="search"
                autoComplete="off"
                placeholder="Ingrese el usuario"
              />
            )}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LockIcon fontSize="large" />

          <Controller
            name="pass"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="pass"
                label="Contraseña"
                size="medium"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.pass ? true : false}
                helperText={errors.pass ? "Por favor completar el campo" : ""}
                type="search"
                autoComplete="off"
                placeholder="Ingrese su contraseña"
              />
            )}
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.light,
            width: "200px",
            alignSelf: "center",
          }}
          size="medium"
          color="primary"
          fullWidth
          type="submit"
        >
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  );
};
export default Login;
