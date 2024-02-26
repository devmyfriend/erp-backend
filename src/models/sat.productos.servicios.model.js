import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";

export const ProductosServicios = Connection.define(
    'ProductosServicios',
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
},  {
            sequelize: Connection,
            modelName: 'ProductosServicios',
            tableName: 'SAT_ProductosServicios',       
            freezeTableName: true,
            timestamps: false
        }
);

export default ProductosServicios;