import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const vwContactoEmail = Connection.define(
	'vwContactoEmail',
    {
        ContactoId: {
			type: DataTypes.INTEGER,
            primaryKey: true,
			allowNull: false,
		
		},
        EmailId: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        Email:{
            type: DataTypes.STRING(100),
            allowNull: false

        }
    },
    {
        sequelize: Connection,
		modelName: 'vwContactoEmail',
		tableName: 'vwContactoEmail',
		timestamps: false,
		freezeTableName: false,
    }
)