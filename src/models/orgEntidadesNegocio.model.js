import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js'; 

export const EntidadNegocio = Connection.define(
    'orgEntidadesNegocio',
    {
        EntidadNegocioId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        EsPropietaria: {
            type: DataTypes.TINYINT,
            validate: {
                max: 1
            },
            allowNull: true
        },
        NombreOficial: {
            type: DataTypes.STRING
        },
        RFC: {
            type: DataTypes.STRING,
            unique: true
        },
        NombreComercial: {
            type: DataTypes.STRING
        },
        ClavePais: {
            type: DataTypes.STRING,
        },
        TaxId: {
            type: DataTypes.STRING,
        },
        ClaveRegimenFiscal: {
            type: DataTypes.STRING
        },
        PersonaFisica:{
            type: DataTypes.TINYINT,
            validate: {
                max: 1
            }
        },
        PersonaMoral:{
            type: DataTypes.TINYINT,
            validate: {
                max: 1
            }
        },
        Borrado: {
            type: DataTypes.INTEGER
        },
        CreadoPor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ActualizadoPor: {
			type: DataTypes.INTEGER,
            allowNull: true
		},
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
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
        timestamps: false,
        freezeTableName: false
    }
);
