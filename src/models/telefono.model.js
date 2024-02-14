import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Telefono = Connection.define(
	'Telefonos',
	{
		TelefonoId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		NumeroTelefonico: {
			type: DataTypes.INTEGER,
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
		ActualizadoEn: {
			type: DataTypes.DATE,	
		},
		CreadoEn: {
			type: DataTypes.DATE,
		}
	},
	{
		tableName: 'orgTelefonos',
		timestamps: false,
		freezeTableName: false,
	},
);
