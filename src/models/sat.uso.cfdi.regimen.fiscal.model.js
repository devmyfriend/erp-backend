import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
import { vwSatCFDI } from './sat.uso.cfdi.model.js';
import { vwRegimenFiscal } from './sat.regimen.fiscal.model.js';

export const CFDIRegimen = Connection.define(
    'CFDIRegimen',
    {
        ClaveUsoCFDI: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        ClaveRegimenFiscal: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: 'UsoCFD_RegimenFiscal',
        timestamps: false,
        freezeTableName: true,
    }
);

vwRegimenFiscal.belongsToMany(vwSatCFDI, { through: CFDIRegimen, foreignKey: 'ClaveRegimenFiscal', otherKey: 'ClaveUsoCFDI' });
vwSatCFDI.belongsToMany(vwRegimenFiscal, { through: CFDIRegimen, foreignKey: 'ClaveUsoCFDI', otherKey: 'ClaveRegimenFiscal' });
