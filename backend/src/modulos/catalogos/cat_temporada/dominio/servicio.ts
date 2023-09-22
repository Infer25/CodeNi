import { Repo_Cat_Temporada } from "./repo_cat_temporada";


export class ValidacionCatTemporada{
  private readonly Repo_: Repo_Cat_Temporada;
  constructor(Repo: Repo_Cat_Temporada) {
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
    if(id==resultado?.num_temporada)  return false;
    if(!resultado?.num_temporada)  return false;
    if(resultado?.num_temporada && id!=resultado?.num_temporada)  return true;
    return false;
  }


}
