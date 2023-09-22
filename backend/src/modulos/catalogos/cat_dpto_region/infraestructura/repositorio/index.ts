import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import sequelize, { Op } from 'sequelize';
import {
  Cat_dpto_region,
  Cat_dpto_region_Paginado,
  RegionPais
} from '../../dominio/entidad_cat_dpto_region';

import { Repo_cat_dpto_region } from '../../dominio/repo_cat_dpto_region';
import { catDptoRegion } from '../models/sequealize';
import { catRegionPais } from '@/modulos/catalogos/cat_region_pais/infraestructura/models/sequealize';

export class SequelizeRepositoryCatDptoRegion implements Repo_cat_dpto_region {
  async obtenerRegionPais(): Promise<RegionPais[] | any> {
    const value = await dbConexion.query(
      'select * from get_region_pais()'
      //  { type: QueryTypes.SELECT ,raw:true}
    );
    return value[0];
  }

  async validarActualizacion(nombre: string): Promise<Cat_dpto_region | null> {
    return await catDptoRegion.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(objeto: Cat_dpto_region): Promise<Cat_dpto_region> {
    const { num_region_pais, nombre, descripcion, registrado_por } =objeto;



    const value = await dbConexion.query(
      'select * from crear_cat_departamento_region(:_nombre_,:_descripcion_,:_registrado_por_,:_num_region_pais_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por,
          _num_region_pais_: num_region_pais,
        },
        model: catDptoRegion
      }
    );
    return value[0];
  }

  async actualizar(
    objeto: Cat_dpto_region,
    num_Cat_region_pais: number
  ): Promise<number> {
    const { num_region_pais, nombre, descripcion, actualizado_por } = objeto;
      console.log(num_region_pais)
    const resultado = await catDptoRegion.update(
      {
        num_region_pais,
        nombre,
        descripcion,
        actualizado_por: actualizado_por,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_departamento_region: num_Cat_region_pais } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Cat_dpto_region | null> {
    return await catDptoRegion.findByPk(id);
  }

  async buscarPorNombre(nombre: string): Promise<Cat_dpto_region | null> {
    return await catDptoRegion.findOne({
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
  ): Promise<Cat_dpto_region[] | Cat_dpto_region_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catDptoRegion.findAndCountAll({
        include: [
          {
            model: catRegionPais,
            as: 'Region',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_departamento_region', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'region')
      return await catDptoRegion.findAndCountAll({
        include: [
          {
            model: catRegionPais,
            as: 'Region',
            attributes: ['nombre'],
            where: {
              [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
            }
          }
        ],

        order: [['num_departamento_region', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catDptoRegion.findAndCountAll({
        include: [
          {
            model: catRegionPais,
            as: 'Region',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_departamento_region', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catDptoRegion.findAndCountAll({
        include: [
          {
            model: catRegionPais,
            as: 'Region',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_departamento_region', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catDptoRegion.findAndCountAll({
        include: [
          {
            model: catRegionPais,
            as: 'Region',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_departamento_region', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catDptoRegion.findAndCountAll({
        include: [
          {
            model: catRegionPais,
            as: 'Region',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.literal('to_char("fecha_registro", \'yyyy-MM-dd\')'),
              { [Op.iLike]: `${filtro}%` }
            )
          ]
        },
        order: [['num_departamento_region', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catDptoRegion.findAndCountAll({
        include: [
          {
            model: catRegionPais,
            as: 'Region',
            attributes: ['nombre']
          }
        ],
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
        order: [['num_departamento_region', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catDptoRegion.findAndCountAll({
        include: [
          {
            model: catRegionPais,
            as: 'Region',
            attributes: ['nombre']
          }
        ],

        order: [['num_departamento_region', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
