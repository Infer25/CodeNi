export type ModelBuscadorBoton = {
  filtro: string;
  filtrar: (valor: string) => void;
  criterioFiltro: JSX.Element | JSX.Element[];
  label: string;
  placeholder: string;
  //onClick:()=>void
  onclickGoToCrear: (direccion: string) => void;
  ruta: string;
  textFieldState: boolean;
  setComboValue: React.Dispatch<
    React.SetStateAction<{
      value: number;
    }>
  >,
  fila:number,
  setPagina: React.Dispatch<React.SetStateAction<number>>,
};
