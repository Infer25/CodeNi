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

import { ListCriteriosub_modulo } from "../../cat_sub_modulo/listar/criterio";
import { Itemsub_moduloColumna } from "../../cat_sub_modulo/listar/sub_moduloHeader";

import { PrivateRoutes } from "@/routes/routes";
import { CerrarBtn } from "@/shared/components/cerrar";
import { ModelFrontedsub_modulo } from "@/shared/zustand/slice/frmCatSubModulo";
import { useFetchGetAllsub_modulo } from "../../cat_sub_modulo/query";
import { FrmActualizarsub_modulo } from "../actualizar/FrmActualizarSubModulo";
import { FrmCrearsub_modulo } from "../crear/FrmCrearSubModulo";
import { TableBodyFrmsub_modulo } from "./tableBody";

export const FrmListarsub_modulo: React.FC<{}> = () => {
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
      case "modulo": {
        setPlaceholder({
          label: "Modulo",
          placeHolder: "Filtrar por Modulo",
        });
        break;
      }

      case "sub_modulo": {
        setPlaceholder({
          label: "sub modulo",
          placeHolder: "Filtrar por sub modulo",
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

  const methods = useForm<ModelFrontedsub_modulo>();

  const { data } = useFetchGetAllsub_modulo(
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
          subMenu="Lista de sub-modulo"
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
              itemList={ListCriteriosub_modulo}
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
          list={Itemsub_moduloColumna}
          children={
            <TableBodyFrmsub_modulo
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

      <FrmCrearsub_modulo state={stateCrear} setStateCrear={setStateCrear} />
      <FrmActualizarsub_modulo state={stateUpdate} changeState={setStateUpdate} />
    </FormProvider>
  );
};
