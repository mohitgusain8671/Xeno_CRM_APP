import mongoose from 'mongoose';
import { subscriber } from '../config/redis.js';
import Order from '../models/order.model.js';
import Customer from '../models/customer.model.js';

export async function startOrderWorker() {
  try {
    await subscriber.subscribe('addOrder', async (message) => {
      try {
        const { customerId, items, totalAmount, orderDate, status } = JSON.parse(message);
        const session = await mongoose.startSession();
        session.startTransaction();
        const order = new Order({
          customerId,
          items,
          totalAmount,
          status: status, 
          orderDate,
        });
        await order.save({ session });
        const customer = await Customer.findById(customerId).session(session);
        if (!customer) {
          throw new Error(`Customer with ID ${customerId} not found`);
        }
        customer.lastOrder = orderDate;
        customer.totalOrders += 1;
        customer.totalSpend += totalAmount;
        customer.avgOrderValue = customer.totalSpend / customer.totalOrders;
        await customer.save({ session });
        await session.commitTransaction();
        console.log(`Order created for customer ${customer}`);
      } catch (err) {
        console.error('Error processing order:', err);
      }
    });

    console.log('Order worker listening for addOrder events');
  } catch (err) {
    console.error('Failed to start order worker:', err);
  }
}
