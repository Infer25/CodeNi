import { Repo_cat_region_pais } from "./repo_cat_region_pais";



export class ValidacionCatRegionPais {
  private readonly Repo_: Repo_cat_region_pais;
  constructor(Repo: Repo_cat_region_pais) {
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
    if(id==resultado?.num_region_pais)  return false;
    if(!resultado?.num_region_pais)  return false;
    if(resultado?.num_region_pais && id!=resultado?.num_region_pais)  return true;
    return false;
  }


}
