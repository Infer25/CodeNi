import { catTipoRubro } from '@/modulos/catalogos/cat_tipo_rubro/infraestructura/model/sequelize/models';
import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_rubro } from '../../../dominio/entidad_cat_rubro';

interface ModelCatRubro extends Model, Cat_rubro {}

export const catRubro = dbConexion.define<ModelCatRubro>(
  'cat_rubro',
  {
    num_rubro: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    num_tipo_rubro: {
      type: DataTypes.STRING
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
    tableName: 'cat_rubro',
    timestamps: false
  }
);
catTipoRubro.hasMany(catRubro, { foreignKey: 'num_tipo_rubro' });

catRubro.belongsTo(catTipoRubro, {
  as: 'TipoRubro',
  foreignKey: 'num_tipo_rubro'
});
