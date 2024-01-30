import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Rutas
import paisRoutes from './src/routes/pais.routes.js';
import catRoutes from './src/routes/catalogos.busquedas.routes.js';
import contactoSucursalRoutes from './src/routes/contacto.sucursal.routes.js';
import datosEmpresa from './src/routes/datos.empresa.routes.js';
import sucursalesRoutes from './src/routes/sucursal.routes.js';
import taxRoutes from './src/routes/tax.routes.js'
import paymentRoutes from './src/routes/payment.routes.js'

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

		app.use('/api/v1/pais', paisRoutes);
		app.use('/api/v1/contacto', contactoSucursalRoutes);
		app.use('/api/v1/empresa', datosEmpresa);
		app.use('/api/v1/sucursal', sucursalesRoutes);
		app.use('/api/v1/catalogo', catRoutes);
		app.use('/api/v1/impuestos', taxRoutes);
		app.use('/api/v1/catalogo', paymentRoutes);
		app.use('/', (req, res) => {
			res.status(404).json({message:'Request not found'})
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
