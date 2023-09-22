import { Existente } from '@/shared/excepciones/Existente';
import { IdNoValido } from '../../cat_estado/dominio/excepciones/idNoValido';
import { ValidacionCatColor } from '../dominio/servicio';
import { Repo_cat_color } from '../dominio/repo_cat_color';
import { Cat_Color } from '../dominio/entidad_cat_color';

export class CasoUsoCatColor {
  private readonly validar: ValidacionCatColor;

  constructor(private readonly repo: Repo_cat_color) {
    this.validar = new ValidacionCatColor(repo);
  }

  public async actualizar(
    objecto: Cat_Color,
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

  public async buscarPorId(id: number): Promise<Cat_Color | null> {
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

  public async registrar(objecto: Cat_Color) {
    const resultado = await this.validar.ValidarNombre(
      objecto.nombre.toLowerCase()
    );
    if (resultado) throw new Existente(objecto.nombre);
    return await this.repo.registrar(objecto);
  }
}
