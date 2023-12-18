import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const Connection = new Sequelize(
	process.env.DB_NAME || 'mariadb',
	process.env.DB_USER || 'dev',
	process.env.DB_PASSWORD || 'Cyber2000',
	{
		host: process.env.DB_HOST || '',
		port: process.env.DB_PORT || '',
		logging: false,
		dialect: 'mariadb',
	},
);
