import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_Tipo_Tierra } from '../../../dominio/entidad_cat_tipo_tierra';

interface ModelCatTipo_Tierra extends Model, Cat_Tipo_Tierra {}

export const catTipo_Tierra = dbConexion.define<ModelCatTipo_Tierra>(
  'cat_tipo_tierra',
  {
    num_tipo_tierra: {
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
    tableName: 'cat_tipo_tierra',
    timestamps: false
  }
);
