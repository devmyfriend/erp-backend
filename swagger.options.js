export const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'ERP API',
			version: '1.0.0',
			description: 'ERP-API',
		},
		servers: [

			{
				url: 'http://localhost:3000',
			},
			{
				url: 'http://lachosoft.cloud:4000/',
			}

		],
	},
	apis: ['./src/routes/*.js'],
};
