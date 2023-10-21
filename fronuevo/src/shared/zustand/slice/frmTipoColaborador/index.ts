

export type ModelBackendTipocolaborador = {
  num_tipo_colaborador: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendTipocolaborador = {
  count: number;
  rows: ModelBackendTipocolaborador[];
};

export type ModelFrontedTipocolaborador = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelApiFrontendTipocolaborador = {
  count: number;
  rows: ModelFrontedTipocolaborador[];
};


//crear
export interface ModelFrmTipocolaboradorFormulario  {
    num_tipo_colaborador: number;
    nombre: string;
    descripcion: string;
  }
  