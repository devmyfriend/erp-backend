import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const Email = Connection.define(
	'Email',
	{
		EmailId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		Email: {
			type: DataTypes.STRING,
		},
		CreadoPor: {
			type: DataTypes.INTEGER,
		},
		ActualizadoPor: {
			type: DataTypes.INTEGER,
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
		tableName: 'orgEmails',
		timestamps: false,
		freezeTableName: false,
	},
);
