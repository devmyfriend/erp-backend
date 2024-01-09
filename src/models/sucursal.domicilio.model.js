import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const SucursalDomicilio = Connection.define(
	'sucursalDomicilio',
	{
		DomicilioId: {
			type: DataTypes.INTEGER,
			allowNull: false,
            primaryKey: true,
		},
		SucursalId: {
			type: DataTypes.INTEGER,
			allowNull: false,
            primaryKey: true,
		},
	},
	{
		tableName: 'sucursal_domicilio',

		timestamps: false,
		freezeTableName: true,
	},
);
