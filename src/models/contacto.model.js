import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Contacto = Connection.define(
	'Contacto',
	{
		ContactoId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		ApellidoPaterno: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ApellidoMaterno: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Nombres: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Departamento: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Puesto: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		CreadoPor: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		ActualizadoPor: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		BorradoPor: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		BorradoEn: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		Borrado: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		sequelize: Connection,
		modelName: 'Contacto',
		tableName: 'orgContactos',
		timestamps: false,
		freezeTableName: false,
	},
);
