import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import sequelize, { Op } from 'sequelize';
import { Cat_Tipo_Identificacion, Cat_Tipo_Identificacion_Paginado } from '../../dominio/entidad_cat_tipo_identificacion';
import { Repo_Cat_Tipo_Identificacion } from '../../dominio/repo_cat_tipo_identificacion';
import { catTipo_Identificacion } from '../models/sequealize';


export class SequelizeRepositorycatTipo_Identificacion implements Repo_Cat_Tipo_Identificacion{
  async validarActualizacion(nombre: string): Promise<Cat_Tipo_Identificacion| null> {
    return await catTipo_Identificacion.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(objeto: Cat_Tipo_Identificacion): Promise<Cat_Tipo_Identificacion> {
    const { nombre, descripcion, registrado_por } = objeto;
    const value = await dbConexion.query(
      'select * from crear_Cat_Tipo_Identificacion(:_nombre_,:_descripcion_,:_registrado_por_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por
        },
        model: catTipo_Identificacion
      }
    );
    return value[0];
  }

  async actualizar(
    objeto: Cat_Tipo_Identificacion,
    id: number
  ): Promise<number> {
    const { nombre, descripcion } = objeto;

    const resultado = await catTipo_Identificacion.update(
      {
        nombre,
        descripcion,
        actualizado_por: 1,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_tipo_identificacion:id } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Cat_Tipo_Identificacion| null> {
    return await catTipo_Identificacion.findByPk(id);
  }

  async buscarPorNombre(nombre: string): Promise<Cat_Tipo_Identificacion| null> {
    return await catTipo_Identificacion.findOne({
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
  ): Promise<Cat_Tipo_Identificacion[] | Cat_Tipo_Identificacion_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catTipo_Identificacion.findAndCountAll({
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_identificacion', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catTipo_Identificacion.findAndCountAll({
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_identificacion', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catTipo_Identificacion.findAndCountAll({
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_identificacion', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catTipo_Identificacion.findAndCountAll({
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_identificacion', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catTipo_Identificacion.findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal('to_char("fecha_registro", \'yyyy-MM-dd\')'),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_tipo_identificacion', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catTipo_Identificacion.findAndCountAll({
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
        order: [['num_tipo_identificacion', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catTipo_Identificacion.findAndCountAll({
        order: [['num_tipo_identificacion', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
