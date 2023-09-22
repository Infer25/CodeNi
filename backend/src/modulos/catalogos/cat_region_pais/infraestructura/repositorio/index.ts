import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
import {
  Cat_region_pais,
  Cat_region_pais_Paginado
} from '../../dominio/entidad_cat_region_pais';
import { catRegionPais } from '../models/sequealize';
import { Repo_cat_region_pais } from '../../dominio/repo_cat_region_pais';

export class SequelizeRepositoryCatRegionPais implements Repo_cat_region_pais {
  async validarActualizacion(nombre: string): Promise<Cat_region_pais | null> {
    return await catRegionPais.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(objeto: Cat_region_pais): Promise<Cat_region_pais> {
    const { nombre, descripcion, registrado_por } = objeto;
    const value = await dbConexion.query(
      'select * from crear_cat_region_pais(:_nombre_,:_descripcion_,:_registrado_por_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por
        },
        model: catRegionPais
      }
    );
    return value[0];
  }

  async actualizar(
    objeto: Cat_region_pais,
    num_Cat_region_pais: number
  ): Promise<number> {
    const { nombre, descripcion } = objeto;

    const resultado = await catRegionPais.update(
      {
        nombre,
        descripcion,
        actualizado_por: 1,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_region_pais:num_Cat_region_pais } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Cat_region_pais | null> {
    return await catRegionPais.findByPk(id);
  }

  async buscarPorNombre(nombre: string): Promise<Cat_region_pais | null> {
    return await catRegionPais.findOne({
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
  ): Promise<Cat_region_pais[] | Cat_region_pais_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catRegionPais.findAndCountAll({
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_region_pais', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catRegionPais.findAndCountAll({
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_region_pais', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catRegionPais.findAndCountAll({
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_region_pais', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catRegionPais.findAndCountAll({
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_region_pais', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catRegionPais.findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal('to_char("fecha_registro", \'yyyy-MM-dd\')'),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_region_pais', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catRegionPais.findAndCountAll({
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
        order: [['num_region_pais', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catRegionPais.findAndCountAll({
        order: [['num_region_pais', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
