import { DataTypes } from 'sequelize';
import { Connection } from "../database/mariadb.database.js";

export const Colonia = Connection.define(
    'Colonias',
    {
        idColonia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        ClaveColonia:{
            type: DataTypes.STRING,
            allowNull: true,
            
        },
        CodigoPostal:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Nombre:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: Connection,
        modelName: 'Colonias',
        tableName: 'SAT_Colonias',
        timestamps: false,
        freezeTableName: true,
        hooks: {
            beforeCreate: async (colonia, options) => {
                try {
                    const lastColonia = await Colonia.findOne({
                        order: [['idColonia', 'DESC']],
                    });

                    const lastId = lastColonia ? lastColonia.idColonia : 0;

                    colonia.ClaveColonia = `P${(lastId + 1).toString().slice(-3)}`;
                } catch (error) {
                    console.error("Error generando la ClaveColonia: ", error);
                }
            },
        },
    },
);