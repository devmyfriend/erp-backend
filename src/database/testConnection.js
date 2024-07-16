import { Connection } from './mariadb.database.js';

const testConnection = async () => {
  try {
    await Connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();
