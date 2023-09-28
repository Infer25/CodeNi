import type { Request, Response } from 'express';

import { handleHttp } from '@/shared/utils/manejadorErrores';
import { CasoUsoTblPersona } from '../aplicacion';

export class ControladorTblPersona {
  constructor(private readonly casoUso: CasoUsoTblPersona) {}



  public registrar = async ({ body }: Request, res: Response) => {
    

  console.log(body)
    try {
      const resultado = await this.casoUso.registrar(body);
      res.send(resultado);
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };

  public obtenerTodo = async ({ params }: Request, res: Response) => {
  
    try {
      const resultado = await this.casoUso.obtenerTodo(
        params.criterio,
        params.filtro,
        +params.pagina,
        +params.cantidadFila
      );
      res.send(resultado);
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };
 

  public obtenerMunicipio = async (req: Request, res: Response) => {
   
    try {
      const resultado = await this.casoUso.obtenerMunicipio();
      res.send(resultado);
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };

  public obtenerTipoIdentificacion = async (req: Request, res: Response) => {
   
    try {
      const resultado = await this.casoUso.obtenerTipoIdentificacion();
      res.send(resultado);
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };

}
