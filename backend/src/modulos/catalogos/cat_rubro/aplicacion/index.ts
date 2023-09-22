import { Existente } from '@/shared/excepciones/Existente';
import { IdNoValido } from '../../cat_estado/dominio/excepciones/idNoValido';
import { Cat_rubro } from '../dominio/entidad_cat_rubro';
import { Repo_cat_rubro } from '../dominio/repo_cat_municipio';
import { ValidacionCatRubro } from '../dominio/servicio';

export class CasoUsoCatRubro {
  private readonly validar: ValidacionCatRubro;

  constructor(private readonly repo: Repo_cat_rubro) {
    this.validar = new ValidacionCatRubro(repo);
  }

  public async actualizar(objecto: Cat_rubro, id: number): Promise<number> {
    const resultado = await this.validar.ValidarActualizacion(
      objecto.nombre,
      id
    );

    if (resultado) throw new Existente(objecto.nombre);

    if (!(await this.repo.buscarPorId(id))) throw new IdNoValido();
    return await this.repo.actualizar(objecto, id);
  }

  public async buscarPorId(id: number): Promise<Cat_rubro | null> {
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
  public async obtenerTipoRubro() {
    return await this.repo.obtenerTipoRubro();
  }

  public async registrar(objecto: Cat_rubro) {
    const resultado = await this.validar.ValidarNombre(
      objecto.nombre.toLowerCase()
    );
    if (resultado) throw new Existente(objecto.nombre);
    return await this.repo.registrar(objecto);
  }
}
