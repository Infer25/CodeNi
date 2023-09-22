import { Existente } from '@/shared/excepciones/Existente';
import { IdNoValido } from '../../cat_estado/dominio/excepciones/idNoValido';
import { ValidacionCatTipo_Tierra } from '../dominio/servicio';
import { Repo_Cat_Tipo_Tierra } from '../dominio/repo_cat_tipo_tierra';
import { Cat_Tipo_Tierra } from '../dominio/entidad_cat_tipo_tierra';

export class CasoUsoCatTipoTierra {
  private readonly validar: ValidacionCatTipo_Tierra;

  constructor(private readonly repo: Repo_Cat_Tipo_Tierra) {
    this.validar = new ValidacionCatTipo_Tierra(repo);
  }

  public async actualizar(objecto: Cat_Tipo_Tierra, id: number): Promise<number> {
    const resultado = await this.validar.ValidarActualizacion(
      objecto.nombre,
      id
    );

    if (resultado) throw new Existente(objecto.nombre);

    if (!(await this.repo.buscarPorId(id))) throw new IdNoValido();
    return await this.repo.actualizar(objecto, id);
  }

  public async buscarPorId(id: number): Promise<Cat_Tipo_Tierra | null> {
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

  public async registrar(objecto: Cat_Tipo_Tierra) {
    const resultado = await this.validar.ValidarNombre(
      objecto.nombre.toLowerCase()
    );
    if (resultado) throw new Existente(objecto.nombre);
    return await this.repo.registrar(objecto);
  }
}
