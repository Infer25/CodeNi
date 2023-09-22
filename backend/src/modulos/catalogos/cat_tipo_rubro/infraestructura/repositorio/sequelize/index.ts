import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
import {
  Repo_cat_tipo_rubro,
  Tipo_Rubro,
  Tipo_Rubro_Paginado
} from '../../../dominio';
import { catTipoRubro } from '../../model/sequelize/models';

export class SequelizeRepositoryTipoRubro implements Repo_cat_tipo_rubro {
  async validarActualizacion(nombre: string): Promise<Tipo_Rubro | null> {
    return await catTipoRubro.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(obj: Tipo_Rubro): Promise<Tipo_Rubro> {
    const { nombre, descripcion, registrado_por } = obj;
    const value = await dbConexion.query(
      'select * from crear_cat_tipo_rubro(:_nombre_,:_descripcion_,:_registrado_por_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por
        },
        model: catTipoRubro
      }
    );
    return value[0];
  }

  async actualizar(obj: Tipo_Rubro, id: number): Promise<number> {
    const { nombre, descripcion } = obj;

    const resultado = await catTipoRubro.update(
      {
        nombre,
        descripcion,
        actualizado_por: 1,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_tipo_rubro: id } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Tipo_Rubro | null> {
    return await catTipoRubro.findByPk(id);
  }

  async buscarPorNombre(nombre: string): Promise<Tipo_Rubro | null> {
    return await catTipoRubro.findOne({
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
  ): Promise<Tipo_Rubro[] | Tipo_Rubro_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catTipoRubro.findAndCountAll({
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catTipoRubro.findAndCountAll({
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catTipoRubro.findAndCountAll({
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catTipoRubro.findAndCountAll({
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_tipo_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catTipoRubro.findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal('to_char("fecha_registro", \'yyyy-MM-dd\')'),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_tipo_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catTipoRubro.findAndCountAll({
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
        order: [['num_tipo_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catTipoRubro.findAndCountAll({
        order: [['num_tipo_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
