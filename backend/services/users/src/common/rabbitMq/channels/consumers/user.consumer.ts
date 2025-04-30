import { RabbitMqClient } from '@common/rabbitmq/src';
import amqp from 'amqplib';
import { UserQueueNames } from '../../../constants';
import mongoose from 'mongoose';
import { DatabaseClient } from '@common/dbconfig/src';
import { UserEnvVars } from '@services/users/config/envConfig';
import { userProfileModel } from '../../../models/';

export class ConsumerChannel {
  private rabbitMqConnection: amqp.ChannelModel | null = null;
  private queueNames = UserQueueNames;
  private databaseConnection: mongoose.Mongoose | null = null;
  private profileModel = userProfileModel;
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
    if (!this.databaseConnection) {
      await this.connectToDBClient();
    }
    if (this.rabbitMqConnection && this.databaseConnection) {
      const channel: amqp.Channel = await this.rabbitMqConnection.createChannel();

      // create a queue if not exist
      await channel.assertQueue(this.queueNames.USER_CREATED);

      channel.consume(
        this.queueNames.USER_CREATED,
        async (msg) => {
          if (msg !== null) {
            console.log('Received:', JSON.parse(msg.content.toString()));
            const parsedData = JSON.parse(msg.content.toString());
            await this.profileModel.create({ userId: parsedData.userId });
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
    const envVarsInstance = new UserEnvVars();
    await dbClient.connect(envVarsInstance.get('MONGO_URI'), { dbName: envVarsInstance.get('DB_NAME') });
    this.databaseConnection = dbClient.connection;
  }
}
