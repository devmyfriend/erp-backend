import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";
import { vwRegimenFiscal } from '../models/sat.regimen.fiscal.model.js';
import { vwSatCFDI } from '../models/sat.uso.cfdi.model.js';

export const CFDIRegimen = Connection.define(
    "UsoCFD_RegimenFiscal",
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
        tableName: "UsoCFD_RegimenFiscal",
        timestamps: false,
        freezeTableName: true,
    }
);

vwRegimenFiscal.belongsToMany(vwSatCFDI, { through: CFDIRegimen, foreignKey: 'ClaveRegimenFiscal', otherKey: 'ClavevwSatCFDI' });
vwSatCFDI.belongsToMany(vwRegimenFiscal, { through: CFDIRegimen, foreignKey: 'ClaveUsoCFDI', otherKey: 'ClaveRegimenFiscal' });
