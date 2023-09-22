import { Repo_cat_tipo_rubro } from "./repo_cat_tipo_rubro";


export class ValidacionTipoRubro {
  private readonly Repo_: Repo_cat_tipo_rubro;
  constructor(Repo: Repo_cat_tipo_rubro) {
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
    if(id==resultado?.num_tipo_rubro)  return false;
    if(!resultado?.num_tipo_rubro)  return false;
    if(resultado?.num_tipo_rubro && id!=resultado?.num_tipo_rubro)  return true;
    return false;
  }


}
