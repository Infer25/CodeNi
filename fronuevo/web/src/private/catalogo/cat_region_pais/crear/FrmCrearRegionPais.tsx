import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModelFrmRegionPaisFormulario } from "@/shared/zustand/slice/frmRegionPais";
import { useCreateRegionPais } from "../query";
import { rutaFrmCrearRegionPais } from ".";
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

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Registrar region pais"
        url={rutaFrmCrearRegionPais}
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
