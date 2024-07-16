import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const VwClaveUnidad = Connection.define('VwClaveUnidad', {
  VwClaveUnidadSat: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  NombreUnidadSat: {
    type: DataTypes.STRING,
  },
  Activo: {
    type: DataTypes.BOOLEAN,
  },
}, {
  tableName: 'Vw_SAT_ClavesUnidades',
  freezeTableName: true,
  timestamps: false,
});

export default VwClaveUnidad;