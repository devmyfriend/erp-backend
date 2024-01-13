import { DataTypes } from 'sequelize';
import { Connection} from '../database/mariadb.database.js';

export const EmpresaEmails = Connection.define(
    'EmpresaEmails',
    {
        EmailId:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        EntidadNegocioId:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    }, 
    {
        tableName: 'empresa_emails',
        timestamps: false,
        freezeTableName: true,
    },
)