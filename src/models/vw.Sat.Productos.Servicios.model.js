import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";

export const VwProductosServicios = Connection.define(
    'VwProductosServicios',
    {
        ClaveProductoServicio: {
            type: DataTypes.NUMBER,
            primaryKey: true
        },
        Descripcion: {
            type: DataTypes.STRING
        },
        PalabrasSimilares: {
            type: DataTypes.STRING
        },
        Activo: {
            type: DataTypes.BOOLEAN
        },
    },  
    {
        sequelize: Connection,
        modelName: 'VwProductosServicios',
        tableName: 'vw_SAT_VwProductosServicios',  // Si la vista en la base de datos se llama así     
        freezeTableName: true,
        timestamps: false
    }
);

export default VwProductosServicios;
