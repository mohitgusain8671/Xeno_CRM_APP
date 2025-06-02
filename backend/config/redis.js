import { createClient } from "redis";
import { REDIS_URL } from "./env.js";
export const publisher = createClient({ url: REDIS_URL });
export const subscriber = createClient({ url: REDIS_URL });

export async function connectToRedis() {
  try {
    await publisher.connect();
    await subscriber.connect();
    console.log('Redis connected successfully');
  } catch (err) {
    console.error('Redis connection error:', err);
  }

  publisher.on('error', (err) => console.error('Publisher Error:', err));
  subscriber.on('error', (err) => console.error('Subscriber Error:', err));
}
