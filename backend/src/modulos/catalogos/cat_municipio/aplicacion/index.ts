import { Existente } from "@/shared/excepciones/Existente";
import { Cat_municipio } from "../dominio/entidad_cat_municipio";
import { Repo_cat_municipio } from "../dominio/repo_cat_municipio";
import { ValidacionCatMunicipio } from "../dominio/servicio";
import { IdNoValido } from "../../cat_estado/dominio/excepciones/idNoValido";

export class CasoUsoCatMunicipio {
  private readonly validar: ValidacionCatMunicipio;

  constructor(private readonly repo: Repo_cat_municipio) {
    this.validar = new ValidacionCatMunicipio(repo);
  }

  public async actualizar(
    objecto: Cat_municipio,
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

  public async buscarPorId(id: number): Promise<Cat_municipio | null> {
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
  public async obtenerMunicipioRegion() {
    return await this.repo.obtenerDepartamentoRegion();
  }
  
  public async registrar(objecto: Cat_municipio) {
    const resultado = await this.validar.ValidarNombre(
      objecto.nombre.toLowerCase()
    );
    if (resultado) throw new Existente(objecto.nombre);
    return await this.repo.registrar(objecto);
  }
}
