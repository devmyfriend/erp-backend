import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Sucursal = Connection.define(
	'Sucursales',
	{
		SucursalId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		ResponsableId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		Nombre: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		EntidadNegocioId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		CreadoPor: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		ActualizadoPor: {
			type: DataTypes.INTEGER,
			allowNull: true,
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
			allowNull: true,
			defaultValue: false,
		},
	},
	{
		tableName: 'orgSurcursales',
		timestamps: false,
		freezeTableName: false,
	},
);
