import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const vwContactoPorSucursal = Connection.define(
	'vwContactoSucursal',
	{
		ContactoId: {
			type: DataTypes.INTEGER,
            primaryKey: true,
			allowNull: false,
		
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
		},
        SucursalId:{
            type: DataTypes.INTEGER,
			allowNull: false,
        }

	},
	{
		sequelize: Connection,
		modelName: 'vwContactoSucursal',
		tableName: 'vwContactoPorSucursal',
		timestamps: false,
		freezeTableName: false,
	},
);