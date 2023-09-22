import { dbConexion } from '@/shared/BD/sequelize';
import { utils } from '@/shared/utils/formateadorFecha';
import sequelize, { Op } from 'sequelize';


import { catTipoRubro } from '@/modulos/catalogos/cat_tipo_rubro/infraestructura/model/sequelize/models';
import { Cat_rubro, Cat_rubro_Paginado, TipoRubro } from '../../dominio/entidad_cat_rubro';
import { Repo_cat_rubro } from '../../dominio/repo_cat_municipio';
import { catRubro } from '../models/sequealize';



export class SequelizeRepositoryCatMunicipio implements Repo_cat_rubro {
  async obtenerTipoRubro(): Promise<TipoRubro[] | any> {
    const value = await dbConexion.query(
      'select * from get_tipo_rubro()'
    );
    return value[0];
  }

  async validarActualizacion(nombre: string): Promise<Cat_rubro | null> {
    return await catRubro.findOne({
      where: {
        nombre
      }
    });
  }

  async registrar(objeto: Cat_rubro): Promise<Cat_rubro> {
    const { num_tipo_rubro, nombre, descripcion, registrado_por } =objeto;


    const value = await dbConexion.query(
      'select * from crear_cat_rubro(:_nombre_,:_descripcion_,:_registrado_por_,:_num_tipo_rubro_)',
      {
        replacements: {
          _nombre_: nombre,
          _descripcion_: descripcion,
          _registrado_por_: registrado_por,
          _num_tipo_rubro_: num_tipo_rubro,
        },
        model: catRubro
      }
    );
    return value[0];
  }

  async actualizar(
    objeto: Cat_rubro,
    id: number
  ): Promise<number> {
    const {num_tipo_rubro, nombre, descripcion, actualizado_por } = objeto;

    const resultado = await catRubro.update(
      {
        num_tipo_rubro,
        nombre,
        descripcion,
        actualizado_por: actualizado_por,
        ultima_fecha_actualizacion: utils.formatoFechaActual()
      },
      { where: { num_rubro:id } }
    );
    return resultado[0];
  }

  async buscarPorId(id: number): Promise<Cat_rubro | null> {
    return await catRubro.findByPk(id);
  }

  async buscarPorNombre(nombre: string): Promise<Cat_rubro | null> {
    return await catRubro.findOne({
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
  ): Promise<Cat_rubro[] | Cat_rubro_Paginado> {
    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await catRubro.findAndCountAll({
        include: [
          {
            model: catTipoRubro,
            as: 'TipoRubro',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'TipoRubro')
      return await catRubro.findAndCountAll({
        include: [
          {
            model: catTipoRubro,
            as: 'TipoRubro',
            attributes: ['nombre'],
            where: {
              [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
            }
          }
        ],

        order: [['num_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'descripcion')
      return await catRubro.findAndCountAll({
        include: [
          {
            model: catTipoRubro,
            as: 'TipoRubro',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ descripcion: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await catRubro.findAndCountAll({
        include: [
          {
            model: catTipoRubro,
            as: 'TipoRubro',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await catRubro.findAndCountAll({
        include: [
          {
            model: catTipoRubro,
            as: 'TipoRubro',
            attributes: ['nombre']
          }
        ],
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await catRubro.findAndCountAll({
        include: [
          {
            model: catTipoRubro,
            as: 'TipoRubro',
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
        order: [['num_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await catRubro.findAndCountAll({
        include: [
          {
            model: catTipoRubro,
            as: 'TipoRubro',
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
        order: [['num_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await catRubro.findAndCountAll({
        include: [
          {
            model: catTipoRubro,
            as: 'TipoRubro',
            attributes: ['nombre']
          }
        ],

        order: [['num_rubro', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    return [];
  }
}
