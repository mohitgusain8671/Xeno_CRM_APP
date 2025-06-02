import mongoose from "mongoose";

export const validateOrderRequestBody = (customer, items, totalAmount) => {
    if (!customer || !items || items.length === 0) {
        const error = new Error('Customer ID and items are required');
        error.statusCode = 400;
        return error;
    }
    if(!totalAmount || totalAmount <= 0) {
        const error = new Error('Total amount must be greater than zero');
        error.statusCode = 400;
        return error;
    }
    return null;
}

export const validateOrderId = (id) => {
    if (!id) {
        const error = new Error('Order Id is required');
        error.statusCode = 400;
        return { orderId: null, error };
    }
    if (!mongoose.isValidObjectId(id)) {
        const error = new Error('Invalid order ID');
        error.status = 400;
        return { orderId: null, error };
    }
    return { orderId: id, error: null }; // No errors, return null
}