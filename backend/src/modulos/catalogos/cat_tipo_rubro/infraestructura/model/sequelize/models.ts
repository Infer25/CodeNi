import { dbConexion } from '@/shared/BD/sequelize';
import { Model, DataTypes } from 'sequelize';
import { Tipo_Rubro } from '../../../dominio';


interface ModelTipoRubro extends Model, Tipo_Rubro {}

export const catTipoRubro = dbConexion.define<ModelTipoRubro>(
  'cat_tipo_rubro',
  {
    num_tipo_rubro: {
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
    },
  },
  {
    tableName: "cat_tipo_rubro",
    timestamps: false
  }
);
