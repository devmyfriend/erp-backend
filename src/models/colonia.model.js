import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Colonias = Connection.define(
	'Colonias',
	{
		ClaveColonia: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		CodigoPostal: {
			type: DataTypes.INTEGER,
		},
		Nombre: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: 'SAT_Colonias',
		timestamps: false,
		freezeTableName: true,
	},
);
