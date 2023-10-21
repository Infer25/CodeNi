type ModelTableHeadCustom = {
  id: number;
  title: string;
};

export type ModelTableHeadList = {
  list: ModelTableHeadCustom[];
  children: JSX.Element | JSX.Element[];
  
};
