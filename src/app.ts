import MainRouter from './routers';
import dotenv from 'dotenv';
import { toNumber } from 'lodash';
import App from './app/index';

dotenv.config({});

const PORT = toNumber(process.env.PORT) as number;

const app = new App(MainRouter, PORT);

app.listen();
