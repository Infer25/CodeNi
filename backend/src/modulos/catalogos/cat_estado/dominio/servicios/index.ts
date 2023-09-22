import { Repo_cat_estado } from '../repositorio/repo_cat_estado';

export class ValidacionEstado {
  private readonly estadoRepo_: Repo_cat_estado;
  constructor(estadoRepo: Repo_cat_estado) {
    this.estadoRepo_ = estadoRepo;
  }
  //VALIDAR ESTADO POR NOMBRE
  async ValidarNombreEstado(nombreEstado: string): Promise<boolean> {
    const estado = await this.estadoRepo_.buscarEstadoPorNombre(nombreEstado);

    if (estado?.nombre) return true;
    return false;
  }
  async ValidarRegistroCargaInicial(id: number): Promise<boolean> {
    const estado = await this.estadoRepo_.buscarEstadoPorId(id);

    if (estado?.nombre == 'Activo' || estado?.nombre == 'Inactivo')
      return true;
    return false;
  }
  async ValidarActualizacion(nombreEstado: string,id:number): Promise<boolean> {
    const val = await this.estadoRepo_.buscarEstadoPorId(id);

    const estado = await this.estadoRepo_.validarActualizacion(nombreEstado);
    
    if(id==estado?.num_estado)  return false;
    if(estado?.num_estado && id!=estado?.num_estado)  return true;
    if(!estado?.num_estado)  return false;
    return false;
  }
}
