import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import { State, StatePaginado } from '../../../dominio/entidad/cat_estado';
import { Repo_cat_estado } from '../../../dominio/repositorio/repo_cat_estado';
import { catEstado } from '../../modelos/sequelize';
import { Op } from 'sequelize';
import sequelize from 'sequelize';

export class SequelizeRepository implements Repo_cat_estado {

  async validarActualizacion(nombre: string): Promise<State | null> {
    return await catEstado.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(estado_: State): Promise<State> {
    const { nombre, descripcion, registrado_por } = estado_;
    const value = await dbConexion.query(
      'select * from crear_cat_estado(:_nombre_,:_descripcion_,:_registrado_por_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por
        },
        model: catEstado
      }
    );
    return value[0];
  }

  async actualizar(state: State, num_estado: number): Promise<number> {
    const { nombre, descripcion } = state;

    const resultado = await catEstado.update(
      {
        nombre,
        descripcion,
        actualizado_por: 1,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_estado } }
    );
    return resultado[0];
  }

  

  /*async cambiarEstado(numestado: number): Promise<number> {
    const valor = await catEstado.findByPk(numestado);
    const resultado = await catEstado.update(
      {
        estado: valor?.estado == 0 ? 1 : 0,
        ultimafechaactualizacion: utils.formatoFechaActual()
      },
      { where: { numestado } }
    );

    return resultado[0];
  }
*/
  async buscarEstadoPorId(id: number): Promise<State | null> {
    return await catEstado.findByPk(id);
  }

  async buscarEstadoPorNombre(nombre: string): Promise<State | null> {
    return await catEstado.findOne({
      where: {
        nombre
      }
    });
  }

  async obtenerTodo(
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ): Promise<State[] | StatePaginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catEstado.findAndCountAll({
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_estado', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catEstado.findAndCountAll({
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_estado', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catEstado.findAndCountAll({
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_estado', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catEstado.findAndCountAll({
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_estado', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catEstado.findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal('to_char("fecha_registro", \'yyyy-MM-dd\')'),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_estado', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catEstado.findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal(
                'to_char("ultima_fecha_actualizacion", \'yyyy-MM-dd\')'
              ),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_estado', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catEstado.findAndCountAll({
        order: [['num_estado', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
