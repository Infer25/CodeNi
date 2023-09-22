import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import sequelize, { Op } from 'sequelize';
import { Repo_Cat_Temporada } from '../../dominio/repo_cat_temporada';
import { Cat_Temporada, Cat_Temporada_Paginado } from '../../dominio/entidad_cat_temporada';
import { catTemporada } from '../models/sequealize';

export class SequelizeRepositorycatTemporada implements Repo_Cat_Temporada{
  async validarActualizacion(nombre: string): Promise<Cat_Temporada| null> {
    return await catTemporada.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(objeto: Cat_Temporada): Promise<Cat_Temporada> {
    const { nombre, descripcion, registrado_por } = objeto;
    const value = await dbConexion.query(
      'select * from crear_cat_temporada(:_nombre_,:_descripcion_,:_registrado_por_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por
        },
        model: catTemporada
      }
    );
    return value[0];
  }

  async actualizar(
    objeto: Cat_Temporada,
    id: number
  ): Promise<number> {
    const { nombre, descripcion } = objeto;

    const resultado = await catTemporada.update(
      {
        nombre,
        descripcion,
        actualizado_por: 1,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_temporada:id } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Cat_Temporada| null> {
    return await catTemporada.findByPk(id);
  }

  async buscarPorNombre(nombre: string): Promise<Cat_Temporada| null> {
    return await catTemporada.findOne({
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
  ): Promise<Cat_Temporada[] | Cat_Temporada_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catTemporada.findAndCountAll({
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_temporada', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catTemporada.findAndCountAll({
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_temporada', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catTemporada.findAndCountAll({
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_temporada', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catTemporada.findAndCountAll({
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_temporada', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catTemporada.findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal('to_char("fecha_registro", \'yyyy-MM-dd\')'),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_temporada', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catTemporada.findAndCountAll({
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
        order: [['num_temporada', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catTemporada.findAndCountAll({
        order: [['num_temporada', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
