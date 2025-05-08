import app from './app';
import { Server } from 'http';
import createError from 'http-errors';
import { EnvManager } from '@config/envConfig/src';

const envVarObj = new EnvManager();

// let server: Server;

// async function main() {
//   try {
//     const RabbitMqClientInstance = new RabbitMqClient();
//     // create an environmental variable instance.
//     const envVarsInstance = new AuthEnvVars();

//     const DatabaseClientInstance = new DatabaseClient();

//     // create an instance of logger class
//     const loggerInstance = new Logger();

//     // create a logger obj.
//     const logger = loggerInstance.createLogger();

//     await RabbitMqClientInstance.connect();

//     logger.info('Connected to RabbitMq Server Successfully.');

//     // Create the ConsumerChannel instance
//     // const consumerChannel = new ConsumerChannel();

//     // Start consuming messages from the 'AUTH_SERVICE' queue
//     // await consumerChannel.consumer();

//     await DatabaseClientInstance.connect(envVarsInstance.get('MONGO_URI'), { dbName: envVarsInstance.get('DB_NAME') });

//     logger.info('Database Connected Successfully.');

//     // Specifies the port number on which the application will run.
//     const PORT = envVarsInstance.get('PORT');

//     // Run the server in local Environment.
//     server = app.listen(PORT, () => {
//       logger.info(`Auth services  server is listening on http://localhost:${PORT}/`);
//     });
//   } catch (error: any) {
//     //logger.error('error', error);
//     throw createError(500, {
//       message: `Something Went Wrong: ${error.message}`
//     });
//   }
// }

// main();

app.listen(envVarObj.get('AUTH_SERVICE_PORT'), () => {
  console.log(`Auth services  server is listening on http://localhost:${envVarObj.get('AUTH_SERVICE_PORT')}/`);
});
