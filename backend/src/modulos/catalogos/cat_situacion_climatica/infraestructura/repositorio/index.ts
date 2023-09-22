import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import sequelize, { Op } from 'sequelize';
import { catSituacionClimatica } from '../models/sequealize';
import { Repo_cat_situacion_climatica } from '../../dominio/repo_cat_situacion_climatica';
import {
  Cat_Situacion_Climatica,
  Cat_Situacion_Climatica_Paginado
} from '../../dominio/entidad_cat_situacion_climatica';

export class SequelizeRepositoryCatSituacionClimatica
  implements Repo_cat_situacion_climatica
{
  async validarActualizacion(
    nombre: string
  ): Promise<Cat_Situacion_Climatica | null> {
    return await catSituacionClimatica.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(
    objeto: Cat_Situacion_Climatica
  ): Promise<Cat_Situacion_Climatica> {
    const { nombre, descripcion, registrado_por } = objeto;
    const value = await dbConexion.query(
      'select * from crear_cat_situacion_climatica(:_nombre_,:_descripcion_,:_registrado_por_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por
        },
        model: catSituacionClimatica
      }
    );
    return value[0];
  }

  async actualizar(
    objeto: Cat_Situacion_Climatica,
    id: number
  ): Promise<number> {
    const { nombre, descripcion } = objeto;

    const resultado = await catSituacionClimatica.update(
      {
        nombre,
        descripcion,
        actualizado_por: 1,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_situacion_climatica: id } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Cat_Situacion_Climatica | null> {
    return await catSituacionClimatica.findByPk(id);
  }

  async buscarPorNombre(
    nombre: string
  ): Promise<Cat_Situacion_Climatica | null> {
    return await catSituacionClimatica.findOne({
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
  ): Promise<Cat_Situacion_Climatica[] | Cat_Situacion_Climatica_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catSituacionClimatica.findAndCountAll({
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_situacion_climatica', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catSituacionClimatica.findAndCountAll({
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_situacion_climatica', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catSituacionClimatica.findAndCountAll({
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_situacion_climatica', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catSituacionClimatica.findAndCountAll({
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_situacion_climatica', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catSituacionClimatica.findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal('to_char("fecha_registro", \'yyyy-MM-dd\')'),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_situacion_climatica', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catSituacionClimatica.findAndCountAll({
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
        order: [['num_situacion_climatica', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catSituacionClimatica.findAndCountAll({
        order: [['num_situacion_climatica', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
