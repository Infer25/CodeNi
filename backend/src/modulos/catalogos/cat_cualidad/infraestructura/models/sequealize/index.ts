import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_Cualidad } from '../../../dominio/entidad_cat_cualidad';

interface ModelCatCualidad extends Model, Cat_Cualidad {}

export const catCualidad = dbConexion.define<ModelCatCualidad>(
  'cat_cualidad',
  {
    num_cualidad: {
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
    tableName: 'cat_cualidad',
    timestamps: false
  }
);
