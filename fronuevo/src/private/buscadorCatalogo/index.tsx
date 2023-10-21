import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Buscador } from "@/shared/components/buscador";
import { TableCustom } from "@/shared/components/tableHead";
import { useState } from "react";
import { ItemCatalogo, ItemCatalogoColumna } from "./items";
import { TableBodyCustom } from "./tableBody";
import { ModelTableRow } from "./tableBody/models";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/routes/routes";

export const BuscadorCatalogo: React.FC<{}> = () => {
  const [lista, setLista] = useState<ModelTableRow[]>(ItemCatalogo);

  const [valor, setValor] = useState<string>("");

  const filtrar = (filtro: string) => {
    setLista(
      filtro == ""
        ? ItemCatalogo
        : lista.filter((x) => new RegExp(`^${filtro}`, "i").test(x.title))
    );

    setValor(filtro);
  };
  const navigate = useNavigate();

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Buscador de catalogo"
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

      <Buscador filtro={valor} filtrar={filtrar} />

      <TableCustom
        list={ItemCatalogoColumna}
        children={<TableBodyCustom List={lista} />}
      />
    </FormContainer>
  );
};
