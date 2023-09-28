import { Existente } from '@/shared/excepciones/Existente';
import { Cat_Persona } from '../dominio/entidad_cat_persona';
import { Repo_Cat_Persona } from '../dominio/repo_cat_persona';
import { ValidacionPersona } from '../dominio/servicio';

export class CasoUsoTblPersona {
  private readonly validar: ValidacionPersona;

  constructor(private readonly repo: Repo_Cat_Persona) {
    this.validar = new ValidacionPersona(repo);
  }

  public async obtenerTodo(
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    return await this.repo.obtenerTodo(criterio, filtro, pagina, cantidadFila);
  }

  public async obtenerMunicipio() {
    return await this.repo.obtenerMunicipio();
  }

  public async obtenerTipoIdentificacion() {
    return await this.repo.obtenerTipoIdentificacion();
  }

  public async registrar(objecto: Cat_Persona) {
    for (const x of objecto.identificacio) {
      const valor = await this.validar.ValidarIdentificacion(x.identificacion);

      if (valor) {
        throw new Existente(x.identificacion.toString());
      }
    }
 
    if (
      await this.validar.ValidarRazonSocial(
        objecto.apellido_razonsocial.toLowerCase()
      )
    )
      throw new Existente(objecto.apellido_razonsocial);

    if (await this.validar.ValidarEmail(objecto.email.toLowerCase()))
      throw new Existente(objecto.email);

    if (await this.validar.ValidarNumeroTelefonico(objecto.movil))
      throw new Existente(objecto.movil);




    return await this.repo.registrar(objecto);
  }
}
