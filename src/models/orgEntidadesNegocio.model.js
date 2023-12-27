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
            }
        },
        NombreOficial: {
            type: DataTypes.STRING
        },
        RFC: {
            type: DataTypes.STRING
        },
        NombreComercial: {
            type: DataTypes.STRING
        },
        ClavePais: {
            type: DataTypes.STRING,
        },
        TaxId: {
            type: DataTypes.STRING,
            validate: {
                is: {
                    args: /^[0-9]{9}$/,
                    msg: "TaxId debe tener exactamente 9 digitos"
                },
                len: {
                    args: [9, 9],
                    msg: "TaxId debe tener exactamente 9 digitos"
                }
            }
        },
        ClaveRegimenFisca: {
            type: DataTypes.STRING
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
        CreadoPor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ActualizadoPor: {
			type: DataTypes.INTEGER
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
        freezeTableName: false
    }
);