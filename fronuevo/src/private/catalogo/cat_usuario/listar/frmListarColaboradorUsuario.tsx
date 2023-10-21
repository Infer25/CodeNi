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
import { FormProvider, useForm } from "react-hook-form";

import { Cat_usuario } from "@/shared/zustand/slice/frmCatUsuario";
import { FrmCrearRol_Usuario } from "../crear/FrmRol_Usuario";
import { useFetchGetAllColaborador } from "../query";
import { ListCriterioColaborador } from "./criterio";
import { TableBodyFrmUsuarioColaborador } from "./tableBody";
import { ItemUsuarioColaboradorColumna } from "./usuarioColaboradorHeader";

export const FrmListarColabradorUsuario: React.FC<{}> = () => {
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

  const { data } = useFetchGetAllColaborador(
    valueRadio,
    valorFiltro,
    pagina,
    comboValue.value
  );

  const methods = useForm<Cat_usuario>();

  const [stateCrear, setStateCrear] = useState<boolean>(false);


  return (
    <FormProvider {...methods}>
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Catalogo colaborador"
          
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
          list={ItemUsuarioColaboradorColumna}
          children={
            <TableBodyFrmUsuarioColaborador
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

      <FrmCrearRol_Usuario
        state={stateCrear}
        changeState={setStateCrear}
      />
    </FormProvider>
  );
};
