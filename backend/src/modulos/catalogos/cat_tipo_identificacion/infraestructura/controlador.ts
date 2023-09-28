import type { Request, Response } from 'express';

import { handleHttp } from '@/shared/utils/manejadorErrores';
import { CasoUsoCatTipoIdentificacion } from '../aplicacion';

export class ControladorCatTipoIdentificacion{
  constructor(private readonly casoUso: CasoUsoCatTipoIdentificacion) {}

  public buscarPorId = async (req: Request, res: Response) => {
    try {
      const resultado = await this.casoUso.buscarPorId(+req.params.id);
      res.send(resultado);
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };

  public actualizar = async ({ body, params }: Request, res: Response) => {
    try {
      const resultado = await this.casoUso.actualizar(body, +params.id);

      if (resultado > 0) {
        res.send('OK');
      } else {
        res.send('FAIL');
      }
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };
  public registrar = async ({ body }: Request, res: Response) => {
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

  public buscarPorNombre = async ({ params }: Request, res: Response) => {
    try {
      const resultado = await this.casoUso.buscarPorNombre(params.nombre);
      res.send(resultado);
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };
}
