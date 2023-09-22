import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_Color } from '../../../dominio/entidad_cat_color';

interface ModelCatColor extends Model, Cat_Color {}

export const catColor = dbConexion.define<ModelCatColor>(
  'cat_color',
  {
    num_color: {
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
    tableName: 'cat_color',
    timestamps: false
  }
);
