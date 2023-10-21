export type ModelTexfieldFrm={
    label: string,
    placeHolder: string,
    
  }


  //para cbx 
export type ModelBackendGetComboBox = {
  identificador: string;
  nombre: string;
};

export type ModelFrontendGetComboBox = {
  id: string;
  nombre: string;
};

export type ModelApiFrontendGetComboBox = {
  rows: ModelFrontendGetComboBox[];
};