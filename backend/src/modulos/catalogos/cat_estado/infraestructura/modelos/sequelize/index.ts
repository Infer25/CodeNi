import { dbConexion } from '@/shared/BD/sequelize';
import { Model, DataTypes } from 'sequelize';
import { State } from '../../../dominio/entidad/cat_estado';

interface ModelState extends Model, State {}

export const catEstado = dbConexion.define<ModelState>(
  'cat_estado',
  {
    num_estado: {
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
    tableName: "cat_estado",
    timestamps: false
  }
);
