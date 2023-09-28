import { tbl_persona_identificacion } from "./entidad_cat_persona";
import { Repo_Cat_Persona } from "./repo_cat_persona";

export class ValidacionPersona {
  private readonly Repo_: Repo_Cat_Persona;
  constructor(Repo: Repo_Cat_Persona) {
    this.Repo_ = Repo;
  }

  async ValidarRazonSocial(razonSocial: string): Promise<boolean> {
    const resultado = await this.Repo_.buscarRazonSocial(razonSocial);
    if (resultado?.apellido_razonsocial) return true;
    return false;
  }

  async ValidarNumeroTelefonico(movil: string): Promise<boolean> {
    const resultado = await this.Repo_.buscarNumeroTelefonico(movil);
    if (resultado?.movil) return true;
    return false;
  }

  async ValidarEmail(email: string): Promise<boolean> {
    const resultado = await this.Repo_.buscarCorreo(email);
    if (resultado?.email) return true;
    return false;
  }

  async ValidarIdentificacion(identificacion: string): Promise<boolean> {
    const resultado = await this.Repo_.buscarIdentificaccion(identificacion);
    if (resultado?.identificacion) return true;
    return false;
  }

  /*async ValidarActualizacion(nombre: string, id: number): Promise<boolean> {
    const resultado = await this.Repo_.validarActualizacion(nombre);
    //if (id == resultado?.num_persona) return false;
    if (!resultado?.num_persona) return false;
    if (resultado?.num_persona && id != resultado?.num_persona)
      return true;
    return false;
  }
*/
}
