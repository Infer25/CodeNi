import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_Tipo_Identificacion } from '../../../dominio/entidad_cat_tipo_identificacion';

interface ModelCatTipo_Identificacion extends Model, Cat_Tipo_Identificacion {}

export const catTipo_Identificacion= dbConexion.define<ModelCatTipo_Identificacion>(
  'cat_tipo_identificacion',
  {
    num_tipo_identificacion: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.STRING
    },
    registrado_por: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    fecha_registro: {
      type: DataTypes.DATE
    },
    actualizado_por: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    ultima_fecha_actualizacion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },

  {
    tableName: 'cat_tipo_identificacion',
    timestamps: false
  }
);
