import { Repo_cat_color } from "./repo_cat_color";


export class ValidacionCatColor {
  private readonly Repo_: Repo_cat_color;
  constructor(Repo: Repo_cat_color) {
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
    if(id==resultado?.num_color)  return false;
    if(!resultado?.num_color)  return false;
    if(resultado?.num_color && id!=resultado?.num_color)  return true;
    return false;
  }


}
