import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js'; 

export const EntidadNegocio = Connection.define(
    'orgEntidadesNegocio',
    {
        EntidadNegocioId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            validate: {
                max: 10
            }
        },
        EsPropietaria: {
            type: DataTypes.TINYINT,
            validate: {
                max: 1
            }
        },
        NombreOficial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        RFC: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 13
            }
        },
        NombreComercial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ClavePais: {
            type: DataTypes.STRING,
        },
        TaxId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 16
            
            }
        },
        ClaveRegimenFisca: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PersonaFisica:{
            type: DataTypes.TINYINT,
            validate: {
                max: 1
            }
        },
        PersonalMoral:{
            type: DataTypes.TINYINT,
            validate: {
                max: 1
            }
        },
        Estatus: {
            type: DataTypes.INTEGER
        },
        BorradoPor: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          BorradoEn: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    }, {
        sequelize: Connection,
        modelName: 'orgEntidadesNegocio',
        tableName: 'orgEntidadesNegocio',
        freezeTableName: false
    }
);