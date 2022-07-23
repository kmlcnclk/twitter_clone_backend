import redis from 'redis';
import log from '../logger';

async function redisConnection() {
  const client = redis.createClient();
  client.connect();

  client.on('connect', () => log.info('Successfully connected to Redis'));
  client.on('error', (error) => log.error(error));
}

export default redisConnection;
