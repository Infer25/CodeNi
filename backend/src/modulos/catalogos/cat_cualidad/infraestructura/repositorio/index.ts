import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import sequelize, { Op } from 'sequelize';
import { Repo_Cat_Cualidad } from '../../dominio/repo_cat_cualidad';
import { Cat_Cualidad, Cat_Cualidad_Paginado } from '../../dominio/entidad_cat_cualidad';
import { catCualidad } from '../models/sequealize';

export class SequelizeRepositorycatCualidad implements Repo_Cat_Cualidad {
  async validarActualizacion(nombre: string): Promise<Cat_Cualidad | null> {
    return await catCualidad.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(objeto: Cat_Cualidad): Promise<Cat_Cualidad> {
    const { nombre, descripcion, registrado_por } = objeto;
    const value = await dbConexion.query(
      'select * from crear_cat_cualidad(:_nombre_,:_descripcion_,:_registrado_por_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por
        },
        model: catCualidad
      }
    );
    return value[0];
  }

  async actualizar(
    objeto: Cat_Cualidad,
    id: number
  ): Promise<number> {
    const { nombre, descripcion } = objeto;

    const resultado = await catCualidad.update(
      {
        nombre,
        descripcion,
        actualizado_por: 1,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_cualidad:id } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Cat_Cualidad | null> {
    return await catCualidad.findByPk(id);
  }

  async buscarPorNombre(nombre: string): Promise<Cat_Cualidad | null> {
    return await catCualidad.findOne({
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
  ): Promise<Cat_Cualidad[] | Cat_Cualidad_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catCualidad.findAndCountAll({
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_cualidad', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catCualidad.findAndCountAll({
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_cualidad', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catCualidad.findAndCountAll({
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_cualidad', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catCualidad.findAndCountAll({
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_cualidad', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catCualidad.findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal('to_char("fecha_registro", \'yyyy-MM-dd\')'),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_cualidad', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catCualidad.findAndCountAll({
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
        order: [['num_cualidad', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catCualidad.findAndCountAll({
        order: [['num_cualidad', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
