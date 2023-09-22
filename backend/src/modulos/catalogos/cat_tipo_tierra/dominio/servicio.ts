import { Repo_Cat_Tipo_Tierra } from "./repo_cat_tipo_tierra";

export class ValidacionCatTipo_Tierra{
  private readonly Repo_: Repo_Cat_Tipo_Tierra;
  constructor(Repo: Repo_Cat_Tipo_Tierra) {
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
    if(id==resultado?.num_tipo_tierra)  return false;
    if(!resultado?.num_tipo_tierra)  return false;
    if(resultado?.num_tipo_tierra && id!=resultado?.num_tipo_tierra)  return true;
    return false;
  }


}
