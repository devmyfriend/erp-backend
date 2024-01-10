import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Rutas
import testRoutes from './src/routes/test.routes.js';
import paisRoutes from './src/routes/pais.routes.js';
import contactoRoutes from './src/routes/contacto.routes.js';
import datosDomicilio from './src/routes/datos.domicilio.routes.js';

// Base de datos
import { Connection } from './src/database/mariadb.database.js';

// Swagger

import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { options } from './swagger.options.js';

dotenv.config();

const App = {
	main: async () => {
		const app = express();
		const PORT = process.env.PORT || 3000;

		// Middlewares
		app.use(cors());
		app.use(express.json());
		app.use(morgan('dev'));

		// Swagger
		const specs = swaggerJsDoc(options);
		app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

		// Rutas
		app.use('/api/v1/test', testRoutes);
		app.use('/api/v1/pais', paisRoutes);
		app.use('/api/v1/contacto', contactoRoutes);
		app.use('/api/v1/domicilio', datosDomicilio);
		app.use('/', (req, res) => {
			res.send(`¡ERP-API!`);
		});

		async function connectDatabase() {
			try {
				await Connection.authenticate();
				console.log('[OK] Conexión establecida con la base de datos');
			} catch (error) {
				console.error(
					'[ERROR] No se pudo conectar con la base de datos ',
					error,
				);
			}
		}

		function handleError(err, req, res, next) {
			console.error(err);
			res.status(500).json({ error: 'Error interno del servidor' });
		}

		// Middleware para manejo de errores
		app.use((err, req, res, next) => {
			console.error(err);
			res.status(500).send('[ERROR] Ocurrió un error en el servidor');
		});

		async function startServer() {
			await connectDatabase();
			app.use(handleError);
			app.listen(PORT, () => {
				console.log(`[ERP-API] se ejecuta en http://localhost:${PORT}`);
			});
		}

		startServer();
	},
};

export default App;
