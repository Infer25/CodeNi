import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { BuscadorBoton } from "@/shared/components/buscadorBoton";
import { RadioGrupCriterio } from "@/shared/components/criterioBusqueda";
import { useState } from "react";

import { TableCustom } from "@/shared/components/tableHead";
import { cantidadFilasDefecto } from "@/shared/environment";

import { PrivateRoutes } from "@/routes/routes";
import { CustomPaginacion } from "@/shared/components/paginacion";
import { ModelTexfieldFrm } from "@/shared/models";
import { ModelCrearProveedorCoordenada } from "@/shared/zustand/slice/proveedor_ubicacion";
import { IconButton, Tooltip } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ItemareaColumna } from "../../Rubro_Coordenada/listar/Header";
import { useFetchGetAllProveedorCoordenada } from "../query";
import { ListCriterioarea } from "./criterio";
import { TableBodyFrmProveedorCoordenada } from "./tableBody";



export const FrmListProveedorCoordenada: React.FC<{}> = () => {
  //const [stateCrear, setStateCrear] = useState<boolean>(false);
  const [stateUpdate, setStateUpdate] = useState<boolean>(false);
  const goToCrear = () => {
  // setStateCrear(true);
  console.log(stateUpdate)
  };

  const [valorFiltro, setValorFiltro] = useState<string>("");
  const Buscar = (value: string) => {
    setValorFiltro(value);
  };

  const [stateTxtField, setStateTxtField] = useState<boolean>(true);
  const [pagina, setPagina] = useState(1);
  const [comboValue, setComboValue] = useState(cantidadFilasDefecto);
  const [valueRadio, setValueRadio] = useState<string>("_");
  const [placeholder, setPlaceholder] = useState<ModelTexfieldFrm>({
    label: "Seleccione un criterio",
    placeHolder: "",
  });

  const handleCloseCriterio = () => {
    setValueRadio("");
  };
  const handleChangeCriterio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);

    switch ((event.target as HTMLInputElement).value) {
      case "nombre": {
        setPlaceholder({
          label: "area",
          placeHolder: "Filtrar por area",
        });
        break;
      }

      case "descripcion": {
        setPlaceholder({
          label: "Descripción",
          placeHolder: "Filtrar por descripción",
        });
        break;
      }
      case "registrado_por": {
        setPlaceholder({
          label: "Registrado por",
          placeHolder: "Filtrar por empleado",
        });
        break;
      }
      case "fecha_registro": {
        setPlaceholder({
          label: "Fecha de registro",
          placeHolder: "yyyy-mm-dd",
        });
        break;
      }
      case "actualizado_por": {
        setPlaceholder({
          label: "Actualizado por",
          placeHolder: "Filtrar por empleado",
        });
        break;
      }
      case "fecha_actualizacion": {
        setPlaceholder({
          label: "Fecha de actualizacion",
          placeHolder: "yyyy-mm-dd",
        });
        break;
      }
      default: {
        setPlaceholder({ label: "Seleccione un criterio", placeHolder: "" });
        break;
      }
    }
    setStateTxtField(
      (event.target as HTMLInputElement).value == "_" ? true : false
    );
  };

  const methods = useForm<ModelCrearProveedorCoordenada>();

  const { data } = useFetchGetAllProveedorCoordenada(
    valueRadio,
    valorFiltro,
    pagina,
    comboValue.value
  );
  const navigate = useNavigate();

  return (
    <FormProvider {...methods}>
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Catalogo area"
          children={
            <Tooltip title={"Cerrar"}>
              <IconButton
                onClick={() =>
                  navigate(
                    `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}`,
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

        <BuscadorBoton
          filtro={valorFiltro}
          filtrar={Buscar}
          criterioFiltro={
            <RadioGrupCriterio
              handleChangeRadio={handleChangeCriterio}
              valueRadio={valueRadio}
              handleClose={handleCloseCriterio}
              itemList={ListCriterioarea}
            />
          }
          label={placeholder.label}
          placeholder={placeholder.placeHolder}
          onclickGoToCrear={goToCrear}
          ruta={"crear"}
          textFieldState={stateTxtField}
          setComboValue={setComboValue}
          setPagina={setPagina}
          fila={comboValue.value}
        />

        <TableCustom
          list={ItemareaColumna}
          children={
            <TableBodyFrmProveedorCoordenada
              List={data?.rows ? data?.rows : []}
              setStateUpdate={setStateUpdate}
            />
          }
        />

        <CustomPaginacion
          cantidadElemento={data?.rows ? data.count : 0}
          fila={comboValue.value}
          pagina={pagina}
          setPagina={setPagina}
        />
      </FormContainer>
  
    </FormProvider>
  );
};
//
//<FrmCrearProveedorCoordenada state={stateCrear} setStateCrear={setStateCrear} />
//<FrmActualizarProveedorCoordenada state={stateUpdate} changeState={setStateUpdate} />