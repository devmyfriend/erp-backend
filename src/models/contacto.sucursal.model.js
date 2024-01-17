import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const ContactoSucursal = Connection.define(
	'ContactoSucursal',
	{
		ContactoId: {
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
		tableName: 'contacto_sucursal',
		timestamps: false,
		freezeTableName: true,
	},
);
