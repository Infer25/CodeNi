import { catDptoRegion } from '@/modulos/catalogos/cat_dpto_region/infraestructura/models/sequealize';
import { dbConexion } from '@/shared/BD/sequelize';
import { DataTypes, Model } from 'sequelize';
import { Cat_municipio } from '../../../dominio/entidad_cat_municipio';


interface ModelCatMunicipio extends Model, Cat_municipio {}

export const catMunicipio = dbConexion.define<ModelCatMunicipio>(
  'cat_municipio',
  {
    num_municipio: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    num_departamento_region: {
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
    tableName: 'cat_municipio',
    timestamps: false
  }
);
catDptoRegion.hasMany(catMunicipio, { foreignKey: 'num_departamento_region' } );

catMunicipio.belongsTo(catDptoRegion, {
  as:'Departamento',foreignKey: 'num_departamento_region'
});
