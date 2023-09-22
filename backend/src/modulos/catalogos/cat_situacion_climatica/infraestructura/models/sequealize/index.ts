import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_Situacion_Climatica } from '../../../dominio/entidad_cat_situacion_climatica';


interface ModelCatSituacionClimatica extends Model, Cat_Situacion_Climatica {}

export const catSituacionClimatica = dbConexion.define<ModelCatSituacionClimatica>(
  'cat_situacion_climatica',
  {
    num_situacion_climatica: {
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
    tableName: 'cat_situacion_climatica',
    timestamps: false
  }
);
