import mongoose from 'mongoose';
import log from '../logger';

function connect() {
  //@ts-ignore
  const DB_URI = process.env.DB_URI as string;

  return mongoose
    .connect(DB_URI, {
      //@ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => log.info('Successfully connected to Mongo DB'))
    .catch((error: any) => {
      log.error('DB Error: ', error);
      process.exit(1);
    });
}

export default connect;
