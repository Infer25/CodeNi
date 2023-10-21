import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { PrivateRoutes } from "@/routes/routes";
import { ModelFrmRegionPaisFormulario } from "@/shared/zustand/slice/frmRegionPais";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { useCreateRegionPais } from "../query";
export const FrmCrearRegionPais: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const { mutate: crear } = useCreateRegionPais();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ModelFrmRegionPaisFormulario>();

  const onSubmit = (data: ModelFrmRegionPaisFormulario) => {
    if (data.nombre != "" && data.descripcion != "") crear(data);
    reset();
  };
  const navigate = useNavigate();

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Registro region pais"
        children={
          <Tooltip title={"Cerrar"}>
            <IconButton
              onClick={() =>
                navigate(
                  `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}/${PrivateRoutes.CATREGIONPAIS}`,
                  { replace: true }
                )
              }
              size="large"
              sx={{
                border: 1,
                bgcolor: "red",
                color: "white",
                ":hover": {
                  bgcolor: "red",
                },
              }}
            />
          </Tooltip>
        }
      />

      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          sx={{
            width: "85%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Controller
            name="nombre"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="regionPaisNombre"
                label="Región"
                size="small"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.nombre ? true : false}
                helperText={errors.nombre ? "Por favor agregar un nombre" : ""}
                type="search"
                autoComplete="off"
                placeholder=" Nombre de región"
              />
            )}
          />

          <Controller
            name="descripcion"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="regionPaisEstado"
                label="Descripcion"
                size="small"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.descripcion ? true : false}
                helperText={
                  errors.descripcion ? "Por favor agregar una descripcion" : ""
                }
                type="search"
                autoComplete="off"
                placeholder="Descripcion de región"
                multiline
                rows={celular ? 5 : 10}
              />
            )}
          />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => reset()}
              sx={{ bgcolor: "red" }}
            >
              Limpiar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              type="submit"
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </FormContainer>
  );
};
