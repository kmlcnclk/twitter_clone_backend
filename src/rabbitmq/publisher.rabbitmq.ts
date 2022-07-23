import amqp from 'amqplib';
import CustomError from '../errors/CustomError';
import { get } from 'lodash';

class PublisherRabbitMQ {
  public verificationEmail = async (queueName: string, message: string) => {
    try {
      const connection = await amqp.connect('amqp://localhost:5672');
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName);

      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    } catch (error: any) {
      if (
        error &&
        get(error, 'message') == 'connect ECONNREFUSED 127.0.0.1:5672'
      ) {
        throw new CustomError(
          'RabbitMQ Connection Error',
          "The application couldn't connect with Rabbitmq",
          500
        );
      }
      throw new CustomError(error.name, error.message, 500);
    }
  };
}

export default PublisherRabbitMQ;
