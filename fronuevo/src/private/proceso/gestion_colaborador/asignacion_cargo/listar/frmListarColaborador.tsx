import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { RadioGrupCriterio } from "@/shared/components/criterioBusqueda";
import { useState } from "react";

import { TableCustom } from "@/shared/components/tableHead";
import { cantidadFilasDefecto } from "@/shared/environment";
import { useNavigate } from "react-router-dom";

import { BuscadorSinBoton } from "@/shared/components/buscadorSinBoton";
import { CustomPaginacion } from "@/shared/components/paginacion";
import { ModelTexfieldFrm } from "@/shared/models";
import { ModelFrmHistorialCargoFormulario } from "@/shared/zustand/slice/proceso/gestion_colaborador/frmAsignacionCargo";
import { FormProvider, useForm } from "react-hook-form";
import { FrmAsignacionCargo } from "../crear/FrmAsignacionCargo";
import { useFetchGetAllCargoColaborador } from "../query";
import { ItemCargoColaboradorColumna } from "./cargoColaboradorHeader";
import { ListCriterioColaborador } from "./criterio";
import { rutaFrmListarCargoColaborador } from "./ruta";
import { TableBodyFrmCargoColaborador } from "./tableBody";

export const FrmListarCargoColabrador: React.FC<{}> = () => {
  const navigate = useNavigate();

  const goToCrear = (ruta: string) => {
    navigate(ruta);
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
      case "cedula": {
        setPlaceholder({
          label: "Identificacion",
          placeHolder: "Filtrar por tipo identificacion",
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

  const { data } = useFetchGetAllCargoColaborador(
    valueRadio,
    valorFiltro,
    pagina,
    comboValue.value
  );

  const methods = useForm<ModelFrmHistorialCargoFormulario>();
  const [stateCrear, setStateCrear] = useState<boolean>(false);

  return (
    <FormProvider {...methods}>
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Catalogo colaborador"
          url={rutaFrmListarCargoColaborador}
        />

        <BuscadorSinBoton
          filtro={valorFiltro}
          filtrar={Buscar}
          criterioFiltro={
            <RadioGrupCriterio
              handleChangeRadio={handleChangeCriterio}
              valueRadio={valueRadio}
              handleClose={handleCloseCriterio}
              itemList={ListCriterioColaborador}
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
          list={ItemCargoColaboradorColumna}
          children={
            <TableBodyFrmCargoColaborador
              List={data?.rows ? data?.rows : []}
              setStateCrear={setStateCrear}
            />
          }
        />

        <CustomPaginacion
          cantidadElemento={data?.rows ? data.count! : 0}
          fila={comboValue.value}
          pagina={pagina}
          setPagina={setPagina}
        />
      </FormContainer>

      <FrmAsignacionCargo state={stateCrear} setStateCrear={setStateCrear} />
    </FormProvider>
  );
};
