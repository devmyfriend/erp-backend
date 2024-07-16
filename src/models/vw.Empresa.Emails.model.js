import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const VwEmpresaEmails = Connection.define(
  'VwEmpresaEmails',
  {
    VwEmailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    EntidadNegocioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'Vw_Empresa_VwEmails',
    timestamps: false,
    freezeTableName: true,
  },
);

export default VwEmpresaEmails;