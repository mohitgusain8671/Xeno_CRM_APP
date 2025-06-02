import { publisher } from "../config/redis.js";
import { validateCustomerId } from "../helper/customer.helper.js";
import { validateOrderId, validateOrderRequestBody } from "../helper/order.helper.js";
import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
    try {
        const { customer, items, totalAmount, status } = req.body;
        const error = validateOrderRequestBody(customer, items, totalAmount);
        if (error) {
            throw error
        }
        const { customerId, err } = validateCustomerId(customer);
        if (err) {
            throw err;
        }
        const existingCustomer = await Customer.findById(customerId).exec();
        if (!existingCustomer) {
            const error = new Error('Customer not found');
            error.statusCode = 404;
            throw error;
        }
        publisher.publish('addOrder', JSON.stringify({
            customerId,
            items: items,
            totalAmount: totalAmount,
            orderDate: new Date(),
            status: status || 'Pending' // Default status to 'Pending' if not provided
        }));   
        res.status(202).json({ status: 'Processing', message: 'Order data accepted' });     

    } catch (error) {
        next(error);
    }
}

export const getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('customerId', 'name email phone')
            .exec();
        if(!orders || orders.length === 0) {
            return res.status(404).json({
                success: true,
                message: 'No orders found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            orders: orders
        });
    } catch (error) {
        next(error);
    }
}

export const getAllCustomerOrders = async (req, res, next) => {
    try {
        const id = req.params.customerId;
        const { customerId, error } = validateCustomerId(id);
        if (error) {
            throw error;
        }
        const orders = await Order.find({ customerId: customerId })
            .populate('customerId', 'name email phone')
            .exec();
        if(!orders || orders.length === 0) {
            return res.status(404).json({
                success: true,
                message: 'No orders found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            orders: orders
        });
    } catch (error) {
        next(error);
    }
}

export const getOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { orderId, error } = validateOrderId(id);
        if (error) {
            throw error;
        }
        const order = await Order.findById(orderId)
            .populate('customerId', 'name email phone')
            .exec();
        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully',
            order: order
        });
    } catch (error) {
        next(error);
    }
}

export const updateStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { orderId, error } = validateOrderId(id);
        if (error) {
            throw error;
        }
        const { status } = req.body;
        if (!status || !['PENDING', 'COMPLETED', 'CANCELLED'].includes(status)) {
            const error = new Error('Invalid status provided');
            error.statusCode = 400;
            throw error;
        }
        console.log('Updating order status for orderId:', orderId, 'to status:', status);
        const order = await Order.findById(orderId).exec();
        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }
        console.log('Found order:');
        order.status = status;
        await order.save();
        console.log('Order status updated successfully:');
        if(status==='CANCELLED') {
            const { customerId } = order.customerId;
            const customer = await Customer.findById(customerId).exec();
            if (customer) {
                customer.totalOrders -= 1;
                customer.totalSpend -= order.totalAmount;
                if (customer.totalOrders > 0) { 
                    customer.avgOrderValue = customer.totalSpend / (customer.totalOrders || 1);
                }
                await customer.save();
            }
        }
        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order: order
        });
    } catch (error) {
        next(error);
    }
}