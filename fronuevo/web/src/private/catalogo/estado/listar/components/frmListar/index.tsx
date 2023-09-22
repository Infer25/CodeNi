import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { BuscadorBoton } from "@/shared/components/buscadorBoton";
import { CustomPaginacion } from "@/shared/components/paginacion";
import { TableCustom } from "@/shared/components/tableHead";
import { cantidadFilasDefecto } from "@/shared/environment";
import { ModelTexfieldFrm } from "@/shared/models";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemEstadoColumna } from "../../columItem";
import { useFetchGetAll } from "../../query";
import { rutaFrmEstado } from "../../ruta";
import { RadioGrupColum } from "../criterio";
import { TableBodyFrmEstado } from "../tableBody";

export const FrmEstado: React.FC<{}> = () => {
  const navigate = useNavigate();

  const goToCrear = (ruta: string) => {
    navigate(ruta);
  };

  const [valorFiltro, setValorFiltro] = useState<string>("");
  const [stateTxtField, setStateTxtField] = useState<boolean>(true);

  const [placeholder, setPlaceholder] = useState<ModelTexfieldFrm>({
    label: "Seleccione un criterio",
    placeHolder: "",
  });

  const Buscar = (value: string) => {
    setValorFiltro(value);
  };

  const [valueRadio, setValueRadio] = useState<string>("_");

  const handleCloseCriterio = () => {
    setValueRadio("");
  };

  const handleChangeCriterio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);

    switch ((event.target as HTMLInputElement).value) {
      case "nombre": {
        setPlaceholder({ label: "Nombre", placeHolder: "Filtrar por nombre" });
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
    setValorFiltro("");
  };

  const [comboValue, setComboValue] = useState(cantidadFilasDefecto);
  const [pagina, setPagina] = useState(1);

  const { data } = useFetchGetAll(
    valueRadio,
    valorFiltro,
    pagina,
    comboValue.value
  );

  /*const bus = () => {
    refetch();
  };*/

  return (
    <FormContainer>

      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Catalogo estado"
        url={rutaFrmEstado}
      />

        <BuscadorBoton
          filtro={valorFiltro}
          filtrar={Buscar}
          criterioFiltro={
            <RadioGrupColum
              handleChangeRadio={handleChangeCriterio}
              valueRadio={valueRadio}
              handleClose={handleCloseCriterio}
            />
          }
          label={placeholder.label}
          placeholder={placeholder.placeHolder}
          //onClick={bus}
          onclickGoToCrear={goToCrear}
          ruta={"crear"}
          textFieldState={stateTxtField}
          setComboValue={setComboValue}
          setPagina={setPagina}
          fila={comboValue.value}
        />
    
          <TableCustom
            list={ItemEstadoColumna}
            children={
              <TableBodyFrmEstado List={data?.rows ? data?.rows : []} />
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

