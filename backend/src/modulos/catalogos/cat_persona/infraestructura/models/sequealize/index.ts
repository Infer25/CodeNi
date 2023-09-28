import { catTipo_Identificacion } from '@/modulos/catalogos/cat_tipo_identificacion/infraestructura/models/sequealize';
import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import {
  Cat_Persona,
  tbl_persona_identificacion
} from '../../../dominio/entidad_cat_persona';
import { catMunicipio } from '@/modulos/catalogos/cat_municipio/infraestructura/models/sequealize';

interface ModelBaseCatTblPersona extends Model, Cat_Persona {}

export const ModelTblPersona = dbConexion.define<ModelBaseCatTblPersona>(
  'cat_persona',
  {
    num_persona: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    fechanac_fechaconstitucion: {
      type: DataTypes.STRING
    },
    origen: {
      type: DataTypes.STRING
    },
    nombre: {
      type: DataTypes.STRING
    },
    apellido_razonsocial: {
      type: DataTypes.STRING,
      allowNull: true
    },
    movil: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    registrado_por: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_registro: {
      type: DataTypes.STRING,
      allowNull: true
    },
    actualizado_por: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'cat_persona',
    timestamps: false
  }
);

interface ModelBasepersona_identificacion
  extends Model,
    tbl_persona_identificacion {}

export const Model_Tblpersona_identificacion =
  dbConexion.define<ModelBasepersona_identificacion>(
    'tbl_persona_identificacion',
    {
      num_persona_identificacion: {
        type: DataTypes.NUMBER,
        primaryKey: true
      },

      num_persona: {
        type: DataTypes.NUMBER
      },
      num_tipo_identificacion: {
        type: DataTypes.STRING

      },
      identificacion: {
        type: DataTypes.STRING
      },
      registrado_por: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fecha_registro: {
        type: DataTypes.STRING
      },
      actualizado_por: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ultima_fecha_actualizacion: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'tbl_persona_identificacion',
      timestamps: false
    }
  );

ModelTblPersona.hasMany(Model_Tblpersona_identificacion, {
  foreignKey: 'num_persona',
  sourceKey: 'num_persona',
  as: 'persona_identificador'
});

Model_Tblpersona_identificacion.belongsTo(ModelTblPersona,
  {
    foreignKey: 'num_persona',
  });


Model_Tblpersona_identificacion.hasOne(catTipo_Identificacion, {
  foreignKey: 'num_tipo_identificacion',
  sourceKey:'num_tipo_identificacion',
  as: 'tipo_identificacion'
});

/*
Model_Tblpersona_identificacion.hasMany(catTipo_Identificacion, {
  foreignKey: 'num_tipo_identificacion',
  sourceKey: 'num_tipo_identificacion',
  as: 'tipo_identificador'
});

catTipo_Identificacion.belongsTo(Model_Tblpersona_identificacion);
*/
ModelTblPersona.hasOne(catMunicipio, {
  foreignKey: 'num_municipio',
  sourceKey:'origen',
  as: 'municipio'
});
