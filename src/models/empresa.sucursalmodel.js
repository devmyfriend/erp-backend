import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const EmpresaSucursal = Connection.define(
	'empresa_sucursal',
	{
		SucursalId: {
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
		tableName: 'empresa_sucursal',
		timestamps: false,
		freezeTableName: true,
	},
);
