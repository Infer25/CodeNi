import { dbConexion } from '@/shared/BD/sequelize';
import sequelize, { Op } from 'sequelize';

import {
  Cat_Persona,
  Cat_Persona_Paginado,
  Municipio,
  Tipo_identificacion,
  tbl_persona_identificacion
} from '../../dominio/entidad_cat_persona';
import { Repo_Cat_Persona } from '../../dominio/repo_cat_persona';
import {
  ModelTblPersona,
  Model_Tblpersona_identificacion
} from '../models/sequealize';

export class SequelizeRepositoryTblPersona implements Repo_Cat_Persona {
  async buscarIdentificaccion(
    identificacion: string
  ): Promise<tbl_persona_identificacion | null> {
    return await Model_Tblpersona_identificacion.findOne({
      where: {
        identificacion
      }
    });
  }

  async buscarNumeroTelefonico(movil: string): Promise<Cat_Persona | null> {
    return await ModelTblPersona.findOne({
      where: {
        movil
      }
    });
  }

  async buscarCorreo(email: string): Promise<Cat_Persona | null> {
    return await ModelTblPersona.findOne({
      where: {
        email
      }
    });
  }

  async buscarRazonSocial(
    apellido_razonsocial: string
  ): Promise<Cat_Persona | null> {
    return await ModelTblPersona.findOne({
      where: {
        apellido_razonsocial
      }
    });
  }

  async obtenerMunicipio(): Promise<Municipio[] | any> {
    const value = await dbConexion.query(
      'select * from get_origen()'
      //  { type: QueryTypes.SELECT ,raw:true}
    );
    return value[0];
  }

  async registrar(objeto: Cat_Persona): Promise<Cat_Persona> {
    const {
      fechanac_fechaconstitucion,
      origen,
      apellido_razonsocial,
      nombre,
      movil,
      email,
      direccion,
      registrado_por,
      identificacio
    } = objeto;
    const value = await dbConexion.query(
      'select * from crear_cat_persona(:_fechanac_fechaconstitucion_,:_origen_,:_nombre_,:_apellido_razonsocial_,:_movil_,:_email_,:_direccion_,:_registrado_por_,:_identificador_)',
      {
        replacements: {
          _fechanac_fechaconstitucion_: fechanac_fechaconstitucion,
          _origen_: +origen,
          _nombre_: nombre,
          _apellido_razonsocial_: apellido_razonsocial,
          _movil_: movil,
          _email_: email,
          _direccion_: direccion,
          _registrado_por_: +registrado_por,
          _identificador_: JSON.stringify(identificacio)
        },
        model: ModelTblPersona
      }
    );

    return value[0];
  }

  async obtenerTipoIdentificacion(): Promise<Tipo_identificacion[] | any> {
    const value = await dbConexion.query(
      'select * from get_TipoIdentificacion()'
      //  { type: QueryTypes.SELECT ,raw:true}
    );
    return value[0];
  }

  async obtenerTodo(
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ): Promise<Cat_Persona[] | Cat_Persona_Paginado> {

    const offset = (pagina - 1) * cantidadFila;

    if (criterio == 'nombre')
      return await ModelTblPersona.findAndCountAll({
        include: [
          {
            association: 'persona_identificador',
            attributes: ['identificacion'],
            required: true,
            as: 'persona_identificador',
            include: [
              {
                association: 'tipo_identificador',
                required: true,
                as: 'tipo_identificador',
                attributes: ['nombre']
              }
            ]
          }
        ],
        where: {
          [Op.and]: [{ nombre: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_persona', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'apellido_razonsocial')
      return await ModelTblPersona.findAndCountAll({
        include: [
          {
            association: 'persona_identificador',
            attributes: ['identificacion'],
            required: true,
            as: 'persona_identificador',
            include: [
              {
                association: 'tipo_identificador',
                required: true,
                as: 'tipo_identificador',
                attributes: ['nombre']
              }
            ]
          }
        ],
        where: {
          [Op.and]: [{ apellido_razonsocial: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_persona', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'origen')
      return await ModelTblPersona.findAndCountAll({
        include: [
          {
            association: 'persona_identificador',
            attributes: ['identificacion'],
            required: true,
            as: 'persona_identificador',
            include: [
              {
                association: 'tipo_identificador',
                required: true,
                as: 'tipo_identificador',
                attributes: ['nombre']
              }
            ]
          }
        ],
        where: {
          [Op.and]: [{ origen: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_persona', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'registrado_por')
      return await ModelTblPersona.findAndCountAll({
        include: [
          {
            model: ModelTblPersona,
            as: 'Identificacion',
            attributes: ['identificacion']
          }
        ],
        where: {
          [Op.and]: [{ registrado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_persona', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'actualizado_por')
      return await ModelTblPersona.findAndCountAll({
        include: [
          {
            model: ModelTblPersona,
            as: 'Identificacion',
            attributes: ['identificacion']
          }
        ],
        where: {
          [Op.and]: [{ actualizado_por: { [Op.iLike]: `${filtro}%` } }]
        },
        order: [['num_persona', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_registro')
      return await ModelTblPersona.findAndCountAll({
        include: [
          {
            model: ModelTblPersona,
            as: 'Identificacion',
            attributes: ['identificacion']
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
        order: [['num_persona', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == 'fecha_actualizacion')
      return await ModelTblPersona.findAndCountAll({
        include: [
          {
            model: ModelTblPersona,
            as: 'Identificacion',
            attributes: ['identificacion']
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
        order: [['num_persona', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila
      });
    if (criterio == '_')
      return await ModelTblPersona.findAndCountAll({
        include: [
          {
            association: 'persona_identificador',
            attributes: ['identificacion'],
           
            //required: true,
            as: 'persona_identificador',
            include: [
              {
                association: 'tipo_identificador',
                required: true,
                as: 'tipo_identificador',
                attributes: ['nombre'],

              },
              
            ]
          },
          {
            association: 'municipio',
            attributes: ['nombre'],
            required: true,
            as: 'municipio',
           
          },
        ],

        order: [['num_persona', 'DESC']],
        offset: offset <= 0 ? 0 : offset,
        limit: cantidadFila,
        distinct:true
      });


    return [];

  }
}
