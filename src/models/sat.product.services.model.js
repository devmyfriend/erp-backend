import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";

export const ProductsServices = Connection.define(
    'satProductServices',
    {
        ClaveProductoServicio: {
            type: DataTypes.STRING,
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
            modelName: 'satProductServices',
            tableName: 'SAT_ProductosServicios',       
            freezeTableName: true,
            timestamps: false
        }
);

export default ProductsServices;