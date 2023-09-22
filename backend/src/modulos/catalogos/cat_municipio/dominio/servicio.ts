import { Repo_cat_municipio } from "./repo_cat_municipio";


export class ValidacionCatMunicipio {
  private readonly Repo_: Repo_cat_municipio;
  constructor(Repo: Repo_cat_municipio) {
    this.Repo_ = Repo;
  }

  async ValidarNombre(nombre: string): Promise<boolean> {
    const resultado = await this.Repo_.buscarPorNombre(nombre);
    if (resultado?.nombre) return true;
    return false;
  }
 
  async ValidarActualizacion(nombre: string,id:number): Promise<boolean> {
  
    const resultado = await this.Repo_.validarActualizacion(nombre);
    if(id==resultado?.num_municipio)  return false;
    if(!resultado?.num_municipio)  return false;
    if(resultado?.num_municipio && id!=resultado?.num_municipio)  return true;
    return false;
  }


}
