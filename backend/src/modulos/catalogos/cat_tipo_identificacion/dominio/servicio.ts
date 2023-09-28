import { Repo_Cat_Tipo_Identificacion } from "./repo_cat_tipo_identificacion";

export class ValidacionCatTipo_Identificacion{
  private readonly Repo_: Repo_Cat_Tipo_Identificacion;
  constructor(Repo: Repo_Cat_Tipo_Identificacion) {
    this.Repo_ = Repo;
  }
  //VALIDAR ESTADO POR NOMBRE
  async ValidarNombre(nombre: string): Promise<boolean> {
    const resultado = await this.Repo_.buscarPorNombre(nombre);
    if (resultado?.nombre) return true;
    return false;
  }
 
  async ValidarActualizacion(nombre: string,id:number): Promise<boolean> {
  
    const resultado = await this.Repo_.validarActualizacion(nombre);
    if(id==resultado?.num_tipo_identificacion)  return false;
    if(!resultado?.num_tipo_identificacion)  return false;
    if(resultado?.num_tipo_identificacion && id!=resultado?.num_tipo_identificacion)  return true;
    return false;
  }


}
