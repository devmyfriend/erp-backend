import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const VwFormaDePago = Connection.define(
    'VwFormaDePago',
    {
      ClaveFormaPago: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      Descripcion: {
        type: DataTypes.STRING,
      },
      Bancarizado: {
        type: DataTypes.BOOLEAN,
      },
      Activo: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize: Connection,
      modelName: 'Vw_SAT_FormaPago',
      tableName: 'Vw_SAT_FormaPago',
      timestamps: false,
      freezeTableName: true,
    },
  );

  export default VwFormaDePago;