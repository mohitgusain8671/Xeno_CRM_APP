import { subscriber } from '../config/redis.js';
import Customer from '../models/customer.model.js';

export async function startCustomerWorker() {
  try {
    await subscriber.subscribe('addCustomer', async (message) => {
      try {
        const { name, email, phone } = JSON.parse(message);
        const newCustomer = new Customer({ name, email, phone });
        await newCustomer.save();
        console.log(`[Customer Worker] New customer saved: ${email}`);
      } catch (err) {
        console.error('[Customer Worker] Error handling addCustomer message:', err);
      }
    });

    console.log('Customer Worker listenng to addCustomer channel');
  } catch (err) {
    console.error('Failed to start Customer Worker:', err);
  }
}
