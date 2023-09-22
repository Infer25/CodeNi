import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Buscador } from "@/shared/components/buscador";
import { TableCustom } from "@/shared/components/tableHead";
import { useState } from "react";
import { ItemCatalogo, ItemCatalogoColumna } from "./items";
import { rutaFrmViewCatalogo } from "./ruta";
import { TableBodyCustom } from "./tableBody";
import { ModelTableRow } from "./tableBody/models";

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

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Buscador de catalogo"
        url={rutaFrmViewCatalogo}
      />

   
        <Buscador filtro={valor} filtrar={filtrar} />
    

    
        <TableCustom
          list={ItemCatalogoColumna}
          children={<TableBodyCustom List={lista} />}
        />
 
    </FormContainer>
  );
};
