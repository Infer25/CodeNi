import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { BuscadorBoton } from "@/shared/components/buscadorBoton";
import { RadioGrupCriterio } from "@/shared/components/criterioBusqueda";
import { useState } from "react";

import { TableCustom } from "@/shared/components/tableHead";
import { cantidadFilasDefecto } from "@/shared/environment";

import { CustomPaginacion } from "@/shared/components/paginacion";
import { ModelTexfieldFrm } from "@/shared/models";
import { FormProvider, useForm } from "react-hook-form";

import { PrivateRoutes } from "@/routes/routes";
import { CerrarBtn } from "@/shared/components/cerrar";
import { ModelFrmcargoFormulario } from "@/shared/zustand/slice/frmCatCargo";
import { FrmActualizarcargo } from "../actualizar/FrmActualizarcargo";
import { FrmCrearcargo } from "../crear/FrmCrearCargo";
import { useFetchGetAllcargo } from "../query";
import { ItemcargoColumna } from "./cargoHeader";
import { ListCriteriocargo } from "./criterio";
import { TableBodyFrmcargo } from "./tableBody";

export const FrmListarcargo: React.FC<{}> = () => {
  const [stateCrear, setStateCrear] = useState<boolean>(false);
  const [stateUpdate, setStateUpdate] = useState<boolean>(false);
  const goToCrear = () => {
    setStateCrear(true);
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
          label: "cargo",
          placeHolder: "Filtrar por cargo",
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

  const methods = useForm<ModelFrmcargoFormulario>();

  const { data } = useFetchGetAllcargo(
    valueRadio,
    valorFiltro,
    pagina,
    comboValue.value
  );

  return (
    <FormProvider {...methods}>
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Lista de cargo"
          children={<CerrarBtn ruta={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}/${PrivateRoutes.CATALOGOS}/`}/>}
  
        />

        <BuscadorBoton
          filtro={valorFiltro}
          filtrar={Buscar}
          criterioFiltro={
            <RadioGrupCriterio
              handleChangeRadio={handleChangeCriterio}
              valueRadio={valueRadio}
              handleClose={handleCloseCriterio}
              itemList={ListCriteriocargo}
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
          list={ItemcargoColumna}
          children={
            <TableBodyFrmcargo
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

      <FrmCrearcargo state={stateCrear} setStateCrear={setStateCrear} />
      <FrmActualizarcargo state={stateUpdate} changeState={setStateUpdate} />
    </FormProvider>
  );
};
