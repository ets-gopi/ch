import { RabbitMqClient } from '@common/rabbitmq/src';
import amqp from 'amqplib';
import { QueueNames } from '../../../constants';
import mongoose from 'mongoose';
import { DatabaseClient } from '@common/dbconfig/src';
import AuthEnvVars from '@services/auth/config/envConfig';
import { userAccountModel } from '../../../models/user.model';

class ConsumerChannel {
  private rabbitMqConnection: amqp.ChannelModel | null = null;
  private queueNames = QueueNames;
  private databaseConnection: mongoose.Mongoose | null = null;
  private authModel = userAccountModel;
  constructor() {
    // Initialize RabbitMqClient
    const rabbitMqClient = new RabbitMqClient();
    this.rabbitMqConnection = rabbitMqClient.connection;

    //Initialize Database
    const dbClient = new DatabaseClient();
    this.databaseConnection = dbClient.connection;
  }

  public async consumer() {
    if (!this.rabbitMqConnection) {
      // Make sure the connection is established before proceeding
      await this.connectToRabbitMq();
    }
    if (this.rabbitMqConnection) {
      const channel: amqp.Channel = await this.rabbitMqConnection.createChannel();

      // create a queue if not exist
      await channel.assertQueue(this.queueNames.AUTH_SIGNUP);

      channel.consume(
        this.queueNames.AUTH_SIGNUP,
        (msg) => {
          if (msg !== null) {
            console.log('Received:', msg.content.toString());
            channel.ack(msg);
          } else {
            console.log('Consumer cancelled by server');
          }
        },
        { noAck: false }
      );
    } else {
      // If the connection is still null, log an error with more context
      console.error('RabbitMQ connection is not established. Cannot consume messages.');
    }
  }

  private async connectToRabbitMq() {
    const rabbitMqClient = new RabbitMqClient();
    await rabbitMqClient.connect(); // Ensure connection is established
    this.rabbitMqConnection = rabbitMqClient.connection;
  }

  private async connectToDBClient() {
    const dbClient = new DatabaseClient();
    // create an environmental variable instance.
    const envVarsInstance = new AuthEnvVars();
    await dbClient.connect(envVarsInstance.get('MONGO_URI'), { dbName: envVarsInstance.get('DB_NAME') });
    this.databaseConnection = dbClient.connection;
  }
}
export default ConsumerChannel;
