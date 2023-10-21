import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { BuscadorBoton } from "@/shared/components/buscadorBoton";
import { RadioGrupCriterio } from "@/shared/components/criterioBusqueda";
import { useState } from "react";

import { TableCustom } from "@/shared/components/tableHead";
import { cantidadFilasDefecto } from "@/shared/environment";

import { FrmCrearRol_Modulo } from "@/private/proceso/Rol_Modulo/crear/FrmRol_modulo";
import { FrmCrearRol_permiso } from "@/private/proceso/Rol_Permiso/crear/FrmRol_permiso";
import { CustomPaginacion } from "@/shared/components/paginacion";
import { ModelTexfieldFrm } from "@/shared/models";
import { ModelFrontedrol } from "@/shared/zustand/slice/frmCatRol";
import { FormProvider, useForm } from "react-hook-form";
import { FrmActualizarrol } from "../actualizar/FrmActualizarArea";
import { FrmCrearrol } from "../crear/FrmCrearArea";
import { useFetchGetAllrol } from "../query";
import { ListCriteriorol } from "./criterio";
import { ItemrolColumna } from "./rolHeader";
import { TableBodyFrmrol } from "./tableBody";
import { PrivateRoutes } from "@/routes/routes";
import { CerrarBtn } from "@/shared/components/cerrar";

export const FrmListarrol: React.FC<{}> = () => {
  const [stateCrear, setStateCrear] = useState<boolean>(false);
  const [stateUpdate, setStateUpdate] = useState<boolean>(false);
  //rol_modulo
  const [stateRol_modulo, setStateRol_modulo] = useState<boolean>(false); //modulo
  const [valorRol, setValorRol] = useState<number>(0);
  const [valorRolNombre, setValorRolNombre] = useState<string>("");
  const [stateRolPermiso, setStateRolPermiso] = useState<boolean>(false); //permiso
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
          label: "rol",
          placeHolder: "Filtrar por rol",
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

  const methods = useForm<ModelFrontedrol>();

  const { data } = useFetchGetAllrol(
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
          subMenu="Lista de rol"
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
              itemList={ListCriteriorol}
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
          list={ItemrolColumna}
          children={
            <TableBodyFrmrol
              List={data?.rows ? data?.rows : []}
              setStateUpdate={setStateUpdate}
              setValorRol={setValorRol}
              setStateRol_modulo={setStateRol_modulo}
              setValorRolNombre={setValorRolNombre}
              setStateRolPermiso={setStateRolPermiso}
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

      <FrmCrearrol state={stateCrear} setStateCrear={setStateCrear} />

      <FrmActualizarrol state={stateUpdate} changeState={setStateUpdate} />
      
      <FrmCrearRol_Modulo
        valorRol={valorRol}
        state={stateRol_modulo}
        changeState={setStateRol_modulo}
        valorRolNombre={valorRolNombre}
      />
      <FrmCrearRol_permiso
        valorRol={valorRol}
        valorRolNombre={valorRolNombre}
        state={stateRolPermiso}
        changeState={setStateRolPermiso}
      />
    </FormProvider>
  );
};
