import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Pais = Connection.define(
	'SAT_Pais',
	{
		clave: {
			type: DataTypes.STRING,
			autoIncrement: false,
			primaryKey: true,
			allowNull: false,
		},
		Descripcion: {
			type: DataTypes.STRING,
		},
	},
	{
		freezeTableName: false,
	},
);
