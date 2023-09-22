import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import sequelize, { Op } from 'sequelize';


import { catDptoRegion } from '@/modulos/catalogos/cat_dpto_region/infraestructura/models/sequealize';

import { Cat_Municipio_Paginado, Cat_municipio, Departamento } from '../../dominio/entidad_cat_municipio';
import { Repo_cat_municipio } from '../../dominio/repo_cat_municipio';
import { catMunicipio } from '../models/sequealize';


export class SequelizeRepositoryCatMunicipio implements Repo_cat_municipio {
  async obtenerDepartamentoRegion(): Promise<Departamento[] | any> {
    const value = await dbConexion.query(
      'select * from get_municipio()'
      //  { type: QueryTypes.SELECT ,raw:true}
    );
    return value[0];
  }

  async validarActualizacion(nombre: string): Promise<Cat_municipio | null> {
    return await catMunicipio.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(objeto: Cat_municipio): Promise<Cat_municipio> {
    const { num_departamento_region, nombre, descripcion, registrado_por } =objeto;

console.log(num_departamento_region, nombre, descripcion, registrado_por )

    const value = await dbConexion.query(
      'select * from crear_cat_municipio(:_nombre_,:_descripcion_,:_registrado_por_,:_num_departamento_region_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por,
          _num_departamento_region_: num_departamento_region,
        },
        model: catMunicipio
      }
    );
    return value[0];
  }

  async actualizar(
    objeto: Cat_municipio,
    id: number
  ): Promise<number> {
    const {num_departamento_region, nombre, descripcion, actualizado_por } = objeto;
console.log(num_departamento_region)
    const resultado = await catMunicipio.update(
      {
        num_departamento_region,
        nombre,
        descripcion,
        actualizado_por: actualizado_por,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_municipio:id } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Cat_municipio | null> {
    return await catMunicipio.findByPk(id);
  }

  async buscarPorNombre(nombre: string): Promise<Cat_municipio | null> {
    return await catMunicipio.findOne({
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
  ): Promise<Cat_municipio[] | Cat_Municipio_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catMunicipio.findAndCountAll({
        include: [
          {
            model: catDptoRegion,
            as: 'Departamento',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_municipio', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'departamento')
      return await catMunicipio.findAndCountAll({
        include: [
          {
            model: catDptoRegion,
            as: 'Departamento',
            attributes: ['nombre'],
            where: {
              [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
            }
          }
        ],

        order: [['num_municipio', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catMunicipio.findAndCountAll({
        include: [
          {
            model: catDptoRegion,
            as: 'Departamento',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_municipio', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catMunicipio.findAndCountAll({
        include: [
          {
            model: catDptoRegion,
            as: 'Departamento',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_municipio', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catMunicipio.findAndCountAll({
        include: [
          {
            model: catDptoRegion,
            as: 'Departamento',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_municipio', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catMunicipio.findAndCountAll({
        include: [
          {
            model: catDptoRegion,
            as: 'Departamento',
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
        order: [['num_municipio', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catMunicipio.findAndCountAll({
        include: [
          {
            model: catDptoRegion,
            as: 'Departamento',
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
        order: [['num_municipio', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catMunicipio.findAndCountAll({
        include: [
          {
            model: catDptoRegion,
            as: 'Departamento',
            attributes: ['nombre']
          }
        ],

        order: [['num_municipio', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
