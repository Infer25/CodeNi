import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useCreateState } from "../../listar/query";
import { rutaFrmCrearEstado } from "../item";
import { ModelFrmEstadoFormulario } from "../model";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
export const FrmCrearEstado: React.FC<{}> = () => {

  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  
  const { mutate: crear } = useCreateState();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ModelFrmEstadoFormulario>();

  const onSubmit = (data: ModelFrmEstadoFormulario) => {

    if (data.nombre != "" && data.descripcion != "") crear(data);
    reset();
  };

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Registrar estado"
        url={rutaFrmCrearEstado}
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
            gap: 2,
          }}
        >
          <Controller
            name="nombre"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="Nombre"
                label="Nombre"
                size="small"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.nombre ? true : false}
                helperText={errors.nombre ? "Por favor agregar un estado" : ""}
                type="search"
                autoComplete="off"
                placeholder=" Nombre del estado"
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
                id="descripcion"
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
                placeholder="Descripcion de estado"
                multiline
                rows={
                  celular?5:10
                }    
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
