import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { BuscadorBoton } from "@/shared/components/buscadorBoton";
import { RadioGrupCriterio } from "@/shared/components/criterioBusqueda";
import { useState } from "react";

import { TableCustom } from "@/shared/components/tableHead";
import { cantidadFilasDefecto } from "@/shared/environment";
import { useNavigate } from "react-router-dom";

import { CustomPaginacion } from "@/shared/components/paginacion";
import { ModelTexfieldFrm } from "@/shared/models";
import { useFetchGetAllTipoRubro } from "../../../query";
import { TableBodyFrmTipoRubro } from "../tableBodyFrmTipoRubro";
import { ItemTipoRubroColumna } from "./columnItem";
import { ListCriterioTipoRubro } from "./criterio/criterio";
import { rutaFrmTipoRubro } from "./ruta";





export const FrmListarTipoRubro: React.FC<{}> = () => {
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
 
      case "nombre": {
        setPlaceholder({ label: "Departamento", placeHolder: "Filtrar por departamento" });
        break;
      }
      case "departamento": {
        setPlaceholder({ label: "Departamento", placeHolder: "Filtrar por departamento" });
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

  const { data } = useFetchGetAllTipoRubro(
    valueRadio,
    valorFiltro,
    pagina,
    comboValue.value
  );
  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Catalogo tipo de rubro"
        url={rutaFrmTipoRubro}
      />

      <BuscadorBoton
        filtro={valorFiltro}
        filtrar={Buscar}
        criterioFiltro={
          <RadioGrupCriterio
            handleChangeRadio={handleChangeCriterio}
            valueRadio={valueRadio}
            handleClose={handleCloseCriterio}
            itemList={ListCriterioTipoRubro}
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
        list={ItemTipoRubroColumna}
        children={
          <TableBodyFrmTipoRubro List={data?.rows ? data?.rows : []} />
        }
      />

      <CustomPaginacion
        cantidadElemento={data?.rows ? data.count : 0}
        fila={comboValue.value}
        pagina={pagina}
        setPagina={setPagina}
      />
    </FormContainer>
  );
};
