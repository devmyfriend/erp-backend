/* import swaggerUI from 'swagger-ui-express'; */

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
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerSetup = {
  swaggerOptions: {
    operationsSorter: (a, b) => {
      const order = {
        'get': 1,
        'post': 2,
        'patch': 3,
        'put': 4,
        'delete': 5,
      };
      return (
        order[a.get("method")] - order[b.get("method")] ||
        a.get("path").localeCompare(b.get("path"))
      );
    },
  },
};
