import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_Temporada } from '../../../dominio/entidad_cat_temporada';

interface ModelCatTemporada extends Model, Cat_Temporada {}

export const catTemporada = dbConexion.define<ModelCatTemporada>(
  'cat_temporada',
  {
    num_temporada: {
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
    tableName: 'cat_temporada',
    timestamps: false
  }
);
