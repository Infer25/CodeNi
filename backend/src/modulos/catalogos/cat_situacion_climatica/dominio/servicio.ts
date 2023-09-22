import { Repo_cat_situacion_climatica } from "./repo_cat_situacion_climatica";


export class ValidacionCatSituacionClimatica{
  private readonly Repo_: Repo_cat_situacion_climatica;
  constructor(Repo: Repo_cat_situacion_climatica) {
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
    if(id==resultado?.num_situacion_climatica)  return false;
    if(!resultado?.num_situacion_climatica)  return false;
    if(resultado?.num_situacion_climatica && id!=resultado?.num_situacion_climatica)  return true;
    return false;
  }


}
