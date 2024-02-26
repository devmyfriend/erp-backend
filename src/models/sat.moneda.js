import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Moneda = Connection.define(
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
		Activo: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
	},
	{
		tableName: 'SAT_Moneda',
		timestamps: false,
		freezeTableName: true,
	},
);
