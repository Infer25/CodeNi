import { Existente } from '@/shared/excepciones/Existente';
import { IdNoValido } from '../../cat_estado/dominio/excepciones/idNoValido';
import { ValidacionCatSituacionClimatica } from '../dominio/servicio';
import { Repo_cat_situacion_climatica } from '../dominio/repo_cat_situacion_climatica';
import { Cat_Situacion_Climatica } from '../dominio/entidad_cat_situacion_climatica';


export class CasoUsoCatSituacionClimatica {
  private readonly validar: ValidacionCatSituacionClimatica;

  constructor(private readonly repo: Repo_cat_situacion_climatica) {
    this.validar = new ValidacionCatSituacionClimatica(repo);
  }

  public async actualizar(
    objecto: Cat_Situacion_Climatica,
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

  public async buscarPorId(id: number): Promise<Cat_Situacion_Climatica | null> {
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

  public async registrar(objecto: Cat_Situacion_Climatica) {
    const resultado = await this.validar.ValidarNombre(
      objecto.nombre.toLowerCase()
    );
    if (resultado) throw new Existente(objecto.nombre);
    return await this.repo.registrar(objecto);
  }
}
