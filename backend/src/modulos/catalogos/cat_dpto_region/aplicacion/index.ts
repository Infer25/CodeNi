import { Existente } from '@/shared/excepciones/Existente';
import { IdNoValido } from '../../cat_estado/dominio/excepciones/idNoValido';

import { ValidacionCatDptoRegion } from '../dominio/servicio';
import { Repo_cat_dpto_region } from '../dominio/repo_cat_dpto_region';
import { Cat_dpto_region } from '../dominio/entidad_cat_dpto_region';

export class CasoUsoDptoRegion {
  private readonly validar: ValidacionCatDptoRegion;

  constructor(private readonly repo: Repo_cat_dpto_region) {
    this.validar = new ValidacionCatDptoRegion(repo);
  }

  public async actualizar(
    objecto: Cat_dpto_region,
    id: number
  ): Promise<number> {
    const resultado = await this.validar.ValidarActualizacion(
      objecto.nombre,
      id
    );

    if (resultado) throw new Existente(objecto.nombre);

    if (!(await this.repo.buscarPorId(id))) throw new IdNoValido();
    return await this.repo.actualizar(objecto, id);
  }

  public async buscarPorId(id: number): Promise<Cat_dpto_region | null> {
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
  public async obtenerRegionPais() {
    return await this.repo.obtenerRegionPais();
  }
  
  public async registrar(objecto: Cat_dpto_region) {
    const resultado = await this.validar.ValidarNombre(
      objecto.nombre.toLowerCase()
    );
    if (resultado) throw new Existente(objecto.nombre);
    return await this.repo.registrar(objecto);
  }
}
