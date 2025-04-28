import { RabbitMqClient } from '@common/rabbitmq/src';
import amqp from 'amqplib';
import { QueueNames } from '../../../constants';
import { QueueName } from '../../../types/rabbitMq';
class PublisherChannel {
  private rabbitMqConnection: amqp.ChannelModel | null = null;
  private queueNames = QueueNames;
  constructor() {
    // Initialize RabbitMqClient
    const rabbitMqClient = new RabbitMqClient();
    this.rabbitMqConnection = rabbitMqClient.connection;
  }
  public async publish(queue: keyof QueueName, data: Record<string, any>) {
    if (!this.rabbitMqConnection) {
      // Make sure the connection is established before proceeding
      await this.connectToRabbitMq();
    }
    if (this.rabbitMqConnection) {
      const channel: amqp.Channel = await this.rabbitMqConnection.createChannel();

      // Get the actual queue name from QueueNames class
      const queueName = this.queueNames[queue];

      // create a queue
      await channel.assertQueue(queueName);

      // send the data to queue
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

      console.log(`[Publisher] Message sent to queue: ${queueName}`);

      await channel.close();
    } else {
      console.log('RabbitMq connection failed.');
    }
  }
  private async connectToRabbitMq() {
    const rabbitMqClient = new RabbitMqClient();
    await rabbitMqClient.connect(); // Ensure connection is established
    this.rabbitMqConnection = rabbitMqClient.connection;
  }
}
export default PublisherChannel;
