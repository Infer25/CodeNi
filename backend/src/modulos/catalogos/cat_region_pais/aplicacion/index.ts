import { Existente } from '@/shared/excepciones/Existente';
import { Cat_region_pais } from '../dominio/entidad_cat_region_pais';
import { Repo_cat_region_pais } from '../dominio/repo_cat_region_pais';
import { ValidacionCatRegionPais } from '../dominio/servicio';
import { IdNoValido } from '../../cat_estado/dominio/excepciones/idNoValido';

export class CasoUsoRegionPais {
  private readonly validar: ValidacionCatRegionPais;

  constructor(private readonly repo: Repo_cat_region_pais) {
    this.validar = new ValidacionCatRegionPais(repo);
  }

  public async actualizar(
    objecto: Cat_region_pais,
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

  public async buscarPorId(id: number): Promise<Cat_region_pais | null> {
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

  public async registrar(objecto: Cat_region_pais) {
    const resultado = await this.validar.ValidarNombre(
      objecto.nombre.toLowerCase()
    );
    if (resultado) throw new Existente(objecto.nombre);
    return await this.repo.registrar(objecto);
  }
}
