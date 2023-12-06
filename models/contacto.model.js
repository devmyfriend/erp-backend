const { DataTypes } = require('sequelize');
const { Mariadb } = require('../database/mariadb.database')

const Contacto = Mariadb.define(
  'SucursalContacto',
  {
    ContactoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    SucursalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ApellidoPaterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ApellidoMaterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Departamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Puesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreadoPor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ActualizadoPor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BorradoPor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    BorradoEn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Borrado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: Mariadb,
    modelName: 'SucursalContacto',
    tableName: 'orgContactos',
    timestamps: false,
    freezeTableName: false,
  }
);

module.exports = Contacto;
