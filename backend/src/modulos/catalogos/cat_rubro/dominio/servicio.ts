import { Repo_cat_rubro } from "./repo_cat_municipio";



export class ValidacionCatRubro {
  private readonly Repo_: Repo_cat_rubro;
  constructor(Repo: Repo_cat_rubro) {
    this.Repo_ = Repo;
  }

  async ValidarNombre(nombre: string): Promise<boolean> {
    const resultado = await this.Repo_.buscarPorNombre(nombre);
    if (resultado?.nombre) return true;
    return false;
  }
 
  async ValidarActualizacion(nombre: string,id:number): Promise<boolean> {
  
    const resultado = await this.Repo_.validarActualizacion(nombre);
    if(id==resultado?.num_rubro)  return false;
    if(!resultado?.num_rubro)  return false;
    if(resultado?.num_rubro && id!=resultado?.num_rubro)  return true;
    return false;
  }


}
