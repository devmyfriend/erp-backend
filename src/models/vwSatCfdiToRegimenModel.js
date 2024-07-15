import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const VwSatCfdiToRegimen = Connection.define('VwSatCfdiToRegimen', {
    ClaveUsoCFDI: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ClaveRegimenFiscal: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Fisica: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Moral: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'vwSatCfdiToRegimen',
    timestamps: false,
    freezeTableName: true,
});
