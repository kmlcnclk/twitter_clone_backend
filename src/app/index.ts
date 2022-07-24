import express, { Application, Router } from 'express';
import cors from 'cors';
import connectMongoDB from '../db/connect';
import connectRedis from '../cache/connect';
import customErrorHandler from '../errors/customErrorHandler';
import log from '../logger';
import { deserializeUser } from '../middlewares';
import ConsumerRabbitMQ from '../rabbitmq/consumer.rabbitmq';
import http from 'http';
import SocketIO from '../socket.io/index';

class App {
  public app: Application;
  public port: number;
  consumer: ConsumerRabbitMQ;
  public server: any;
  socketIO: SocketIO;

  constructor(router: Router, port: number) {
    this.app = express();
    this.port = port;
    this.consumer = new ConsumerRabbitMQ();
    this.server = http.createServer(this.app);
    this.socketIO = new SocketIO(this.server);

    this.databaseConnection();
    // this.rabbitMQ();
    this.initializeMiddlewares();
    this.initializeRouter(router);
    this.initializeCustomErrorHandler();
  }

  private databaseConnection() {
    connectMongoDB();
    // connectRedis();
  }

  private rabbitMQ() {
    this.consumer.verificationEmail('verificationEmail');
  }

  private initializeMiddlewares() {
    // buradaki cors çalışıyor mu ona bak
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(deserializeUser);
  }

  private initializeRouter(router: Router) {
    this.app.use(router);
  }

  private initializeCustomErrorHandler() {
    this.app.use(customErrorHandler);
  }

  public listen() {
    // this.app.listen(this.port || 5000, () => {
    //   log.info(`Server running at http://localhost:${this.port}`);
    // });
    this.server.listen(this.port || 5000, () => {
      log.info(`Server running at http://localhost:${this.port}`);
    });
  }
}

export default App;
