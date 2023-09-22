import { handleHttp } from '@/shared/utils/manejadorErrores';
import { CasoUsoEstado } from '../../aplicacion/casoUso';
import type { Request, Response } from 'express';
export class ControladorEstado {
  constructor(private readonly casoUso: CasoUsoEstado) {}

  public buscarPorId = async (req: Request, res: Response) => {
  
    try {
      const resultado = await this.casoUso.buscarPorId(+req.params.num_estado);
      res.send(resultado);
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };

  /*public cambiarEstado = async ({ params }: Request, res: Response) => {
    try {
      const resultado = await this.casoUso.cambiarEstado(+params.num_estado);

      if (resultado > 0) {
        res.send('OK');
      } else {
        res.send('FAIL');
      }
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };*/

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

  public buscarPorNombre = async ({ params }: Request, res: Response) => {
    try {
      const resultado = await this.casoUso.buscarPorNombre(params.nombre);
      res.send(resultado);
    } catch (e) {
      handleHttp(res, ' ' + e);
    }
  };
}
