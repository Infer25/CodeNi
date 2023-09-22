 export type ModelTableRowFrmEstado ={
  id: string;
  Estado: string;
  Descripciòn: string;
  ["registrado por"]: string;
  ["Fecha de registro"]: string;
  actualizadopor: string;
  ultimafechaactualizacion: string;
  }

  export type ModelTableRowListFrmEstado ={
   List:ModelTableRowFrmEstado[]
  }