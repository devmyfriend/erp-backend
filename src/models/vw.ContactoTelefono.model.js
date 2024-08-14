import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const vwContactoTelefono = Connection.define(
	'vwContactoTelefono',
    {
        ContactoId: {
			type: DataTypes.INTEGER,
            primaryKey: true,
			allowNull: false,
		
		},
        TelefonoId: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        NumeroTelefonico:{
            type: DataTypes.STRING(20),
            allowNull: false

        }
    },
    {
        sequelize: Connection,
		modelName: 'vwContactoTelefono',
		tableName: 'vwContactoTelefono',
		timestamps: false,
		freezeTableName: false,
    }
)