import { Existente } from '@/shared/excepciones/Existente';
import {
  Repo_cat_tipo_rubro,
  Tipo_Rubro,
  ValidacionTipoRubro
} from '../dominio';
import { IdNoValido } from '@/shared/excepciones/idNoValido';

export class CasoUsoTipoRubro {
  private readonly validar: ValidacionTipoRubro;

  constructor(private readonly repo: Repo_cat_tipo_rubro) {
    this.validar = new ValidacionTipoRubro(repo);
  }

  public async actualizar(obj: Tipo_Rubro, id: number): Promise<number> {
    const resultado = await this.validar.ValidarActualizacion(obj.nombre, id);

    if (resultado) throw new Existente(obj.nombre);

    if (!(await this.repo.buscarPorId(id))) throw new IdNoValido();
    return await this.repo.actualizar(obj, id);
  }

  public async buscarPorId(id: number): Promise<Tipo_Rubro | null> {
    return await this.repo.buscarPorId(id);
  }
  public async buscarPorNombre(nombre: string) {
    return await this.repo.buscarPorNombre(nombre);
  }

  public async obtenerTodo(
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    return await this.repo.obtenerTodo(criterio, filtro, pagina, cantidadFila);
  }

  public async registrar(obj: Tipo_Rubro) {
    const resultado = await this.validar.ValidarNombre(
      obj.nombre.toLowerCase()
    );
    if (resultado) throw new Existente(obj.nombre);
    return await this.repo.registrar(obj);
  }
}
