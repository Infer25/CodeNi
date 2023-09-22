import { catRegionPais } from '@/modulos/catalogos/cat_region_pais/infraestructura/models/sequealize';
import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_dpto_region } from '../../../dominio/entidad_cat_dpto_region';

interface ModelCatDptoRegion extends Model, Cat_dpto_region {}

export const catDptoRegion = dbConexion.define<ModelCatDptoRegion>(
  'cat_departamento_region',
  {
    num_departamento_region: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    num_region_pais: {
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
    tableName: 'cat_departamento_region',
    timestamps: false
  }
);
catRegionPais.hasMany(catDptoRegion, { foreignKey: 'num_region_pais' } );

catDptoRegion.belongsTo(catRegionPais, {
  as:'Region',foreignKey: 'num_region_pais'
});
