import amqp from 'amqplib';

// Example of creating a connection and channel with typing
class RabbitMqClient {
  private connectionURI = 'amqp://localhost';
  public connection: amqp.ChannelModel | null = null;
  constructor() {}
  public async connect() {
    if (!this.connection) {
      this.connection = await amqp.connect(this.connectionURI);
    }
    return this.connection;
  }
}

export default RabbitMqClient;
