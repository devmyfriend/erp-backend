import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Coin = Connection.define(
	'Moneda',
	{
		ClaveMoneda : {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		Descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'SAT_Moneda',
		timestamps: false,
		freezeTableName: true,
	},
);
