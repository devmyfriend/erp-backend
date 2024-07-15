import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";
import { regimenFiscal } from '../models/sat.regimen.fiscal.model.js';
import { UsoCFDI } from '../models/sat.uso.cfdi.model.js';

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

regimenFiscal.belongsToMany(UsoCFDI, { through: CFDIRegimen, foreignKey: 'ClaveRegimenFiscal', otherKey: 'ClaveUsoCFDI' });
UsoCFDI.belongsToMany(regimenFiscal, { through: CFDIRegimen, foreignKey: 'ClaveUsoCFDI', otherKey: 'ClaveRegimenFiscal' });
