import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const VwEmail = Connection.define(
  'VwEmail',
  {
    VwEmailId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    VwEmail: {
      type: DataTypes.STRING,
    },
    CreadoPor: {
      type: DataTypes.INTEGER,
    },
    ActualizadoPor: {
      type: DataTypes.INTEGER,
    },
    ActualizadoEn: {
      type: DataTypes.DATE,
    },
    BorradoPor: {
      type: DataTypes.INTEGER,
    },
    BorradoEn: {
      type: DataTypes.DATE,
    },
    Borrado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'Vw_orgVwEmails',
    timestamps: false,
    freezeTableName: false,
  },
);

export default VwEmail;