import { Repo_cat_dpto_region } from './repo_cat_dpto_region';

export class ValidacionCatDptoRegion {
  private readonly Repo_: Repo_cat_dpto_region;
  constructor(Repo: Repo_cat_dpto_region) {
    this.Repo_ = Repo;
  }
  //VALIDAR ESTADO POR NOMBRE
  async ValidarNombre(nombre: string): Promise<boolean> {
    const resultado = await this.Repo_.buscarPorNombre(nombre);
    if (resultado?.nombre) return true;
    return false;
  }

  async ValidarActualizacion(nombre: string, id: number): Promise<boolean> {
    const resultado = await this.Repo_.validarActualizacion(nombre);
    if (id == resultado?.num_departamento_region) return false;
    if (!resultado?.num_departamento_region) return false;
    if (resultado?.num_region_pais && id != resultado?.num_departamento_region)
      return true;
    return false;
  }
}
