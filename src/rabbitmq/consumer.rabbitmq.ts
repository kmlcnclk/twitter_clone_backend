import amqp from 'amqplib';
import CustomError from '../errors/CustomError';
import { get } from 'lodash';
import VerificationService from '../services/verification.service';

class ConsumerRabbitMQ {
  verificationService: VerificationService;

  constructor() {
    this.verificationService = new VerificationService();
  }

  public verificationEmail = async (queueName: string) => {
    try {
      const connection = await amqp.connect('amqp://localhost:5672');
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName);

      channel.consume(queueName, async (message: any) => {
        const email = JSON.parse(message.content.toString());

        await this.verificationService.verificationEmail(email);

        channel.ack(message);
      });
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

export default ConsumerRabbitMQ;
