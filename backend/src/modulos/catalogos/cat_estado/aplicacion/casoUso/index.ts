import { State } from '../../dominio/entidad/cat_estado';
import { EstadoExistenteNombre } from '../../dominio/excepciones/estadoExistente';
import { EstadoInmutable } from '../../dominio/excepciones/estadoNoAccesible';
import { IdNoValido } from '../../dominio/excepciones/idNoValido';
import { Repo_cat_estado } from '../../dominio/repositorio/repo_cat_estado';
import { ValidacionEstado } from '../../dominio/servicios';

export class CasoUsoEstado {
  private readonly validar: ValidacionEstado;

  constructor(private readonly repoestado: Repo_cat_estado) {
    this.validar = new ValidacionEstado(repoestado);
  }

  public async actualizar(state: State, numestado: number): Promise<number> {
 
    
    const validacion = await this.validar.ValidarRegistroCargaInicial(
      numestado
    );

    if (validacion) throw new EstadoInmutable();
    const resultado = await this.validar.ValidarActualizacion(
      state.nombre,
      numestado
    );

    if (resultado) throw new EstadoExistenteNombre(state.nombre);

    if (!(await this.repoestado.buscarEstadoPorId(numestado)))
      throw new IdNoValido();
    return await this.repoestado.actualizar(state, numestado);
  }

  public async buscarPorId(id: number): Promise<State | null> {
    return await this.repoestado.buscarEstadoPorId(id);
  }
  public async buscarPorNombre(nombre: string) {
    return await this.repoestado.buscarEstadoPorNombre(nombre);
  }
  /*public async cambiarEstado(id: number) {
    const resultado = await this.validar.ValidarRegistroCargaInicial(id);
    if (resultado) throw new EstadoInmutable();
    return await this.repoestado.cambiarEstado(id);
  }*/

  public async obtenerTodo(
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    return await this.repoestado.obtenerTodo(
      criterio,
      filtro,
      pagina,
      cantidadFila
    );
  }

  public async registrar(state: State) {
    const resultado = await this.validar.ValidarNombreEstado(
      state.nombre.toLowerCase()
    );
    if (resultado) throw new EstadoExistenteNombre(state.nombre);
    return await this.repoestado.registrar(state);
  }
}
