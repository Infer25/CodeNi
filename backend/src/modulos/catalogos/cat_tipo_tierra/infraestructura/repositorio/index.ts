import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import sequelize, { Op } from 'sequelize';

import { catTipo_Tierra } from '../models/sequealize';
import { Cat_Tipo_Tierra, Cat_Tipo_Tierra_Paginado } from '../../dominio/entidad_cat_tipo_tierra';
import { Repo_Cat_Tipo_Tierra } from '../../dominio/repo_cat_tipo_tierra';


export class SequelizeRepositorycatTipo_Tierra implements Repo_Cat_Tipo_Tierra{
  async validarActualizacion(nombre: string): Promise<Cat_Tipo_Tierra| null> {
    return await catTipo_Tierra.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(objeto: Cat_Tipo_Tierra): Promise<Cat_Tipo_Tierra> {
    const { nombre, descripcion, registrado_por } = objeto;
    const value = await dbConexion.query(
      'select * from crear_cat_tipo_tierra(:_nombre_,:_descripcion_,:_registrado_por_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por
        },
        model: catTipo_Tierra
      }
    );
    return value[0];
  }

  async actualizar(
    objeto: Cat_Tipo_Tierra,
    id: number
  ): Promise<number> {
    const { nombre, descripcion } = objeto;

    const resultado = await catTipo_Tierra.update(
      {
        nombre,
        descripcion,
        actualizado_por: 1,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_tipo_tierra:id } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Cat_Tipo_Tierra| null> {
    return await catTipo_Tierra.findByPk(id);
  }

  async buscarPorNombre(nombre: string): Promise<Cat_Tipo_Tierra| null> {
    return await catTipo_Tierra.findOne({
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
  ): Promise<Cat_Tipo_Tierra[] | Cat_Tipo_Tierra_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catTipo_Tierra.findAndCountAll({
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_tierra', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catTipo_Tierra.findAndCountAll({
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_tierra', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catTipo_Tierra.findAndCountAll({
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_tierra', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catTipo_Tierra.findAndCountAll({
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_tierra', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catTipo_Tierra.findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal('to_char("fecha_registro", \'yyyy-MM-dd\')'),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_tipo_tierra', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catTipo_Tierra.findAndCountAll({
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
        order: [['num_tipo_tierra', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catTipo_Tierra.findAndCountAll({
        order: [['num_tipo_tierra', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
