import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_region_pais } from '../../../dominio/entidad_cat_region_pais';
import { catDptoRegion } from '@/modulos/catalogos/cat_dpto_region/infraestructura/models/sequealize';

interface ModelCatRegionPais extends Model, Cat_region_pais {}

export const catRegionPais = dbConexion.define<ModelCatRegionPais>(
  'cat_region_pais',
  {
    num_region_pais: {
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
    tableName: 'cat_region_pais',
    timestamps: false
  }
);
