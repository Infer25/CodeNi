import { Repo_Cat_Cualidad } from "./repo_cat_cualidad";


export class ValidacionCatCualidad{
  private readonly Repo_: Repo_Cat_Cualidad;
  constructor(Repo: Repo_Cat_Cualidad) {
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
    if(id==resultado?.num_cualidad)  return false;
    if(!resultado?.num_cualidad)  return false;
    if(resultado?.num_cualidad && id!=resultado?.num_cualidad)  return true;
    return false;
  }


}
