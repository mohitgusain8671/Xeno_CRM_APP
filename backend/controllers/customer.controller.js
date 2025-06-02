import { publisher } from '../config/redis.js';
import { validateCustomerRequestBody, validateCustomerId } from '../helper/customer.helper.js';
import Customer from '../models/customer.model.js';

export const addCustomer = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        // Validate request body
        const error = validateCustomerRequestBody(name, email, phone);
        if (error) {
            throw error;
        }
        const existingCustomer = await Customer.find({ email }).exec();
        if (existingCustomer.length > 0) {
            const error = new Error('Customer with this email already exists');
            error.statusCode = 400;
            throw error;
        }
        // push into redis queue
        publisher.publish('addCustomer', JSON.stringify({ name, email, phone }));
        res.status(202).json({ status: 'Processing', message: 'Customer data accepted' });
    
    } catch (error) {
        next(error);
    }
}

export const getAllCustomer = async (req, res, next) => {
    try {
        const customers = await Customer.find().exec();
        res.status(200).json({
            success: true,
            message: 'Customers fetched successfully',
            users: customers
        });
    } catch (error) {
        next(error);
    }
}

export const getCustomer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { customerId, error } = validateCustomerId(id);
        if (error) {
            throw error;

        }
        const customer = await Customer.findById(customerId).exec();
        if (!customer) {
            const error = new Error('Customer not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Customer fetched successfully',
            user: customer
        });
    
    } catch (error) {
        next(error);
    }
}

export const updateVisitStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { customerId, error } = validateCustomerId(id);
        if (error) {
            throw error;
        }
        const customer = await Customer.findById(customerId).exec();
        if (!customer) {
            const error = new Error('Customer not found');
            error.statusCode = 404;
            throw error;
        } 
        const currDate = new Date();
        if( customer.lastVisit.getDate() === currDate.getDate() &&
            customer.lastVisit.getMonth() === currDate.getMonth() &&
            customer.lastVisit.getFullYear() === currDate.getFullYear()) {
            customer.lastVisit = currDate;
            await customer.save();
            const error = new Error('Customer already visited today');
            error.statusCode = 400;
            throw error;
        }
        customer.lastVisit = currDate;
        customer.visitCount += 1;
        const updatedCustomer = await customer.save();
        res.status(200).json({
            success: true,
            message: 'Customer visit status updated successfully',
            user: updatedCustomer
        });
    } catch (error) {
        next(error);
    }
}
