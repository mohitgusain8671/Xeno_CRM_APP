import mongoose from "mongoose";


export const validateCustomerRequestBody = (name, email, phone) => {
    if (!name || !email || !phone) {
        const error = new Error('Name, email, and phone are required');
        error.statusCode = 400;
        return error;
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof phone !== 'string') {
        const error = new Error('Name, email, and phone must be strings');
        error.statusCode = 400;
        return error;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        const error = new Error('Invalid email format');
        error.statusCode = 400;
        return error;
    }

    if (!/^\d{10}/.test(phone)) {
        const error = new Error('Invalid phone number format');
        error.statusCode = 400;
        return error;
    }
    return null; // No errors, return null
}

export const validateCustomerId = (id) => {
    if (!id) {
        const error = new Error('Customer ID is required');
        error.statusCode = 400;
        return { customerId: null, error };
    }
    if (!mongoose.isValidObjectId(id)) {
        const error = new Error('Invalid customer ID');
        error.status = 400;
        return { customerId: null, error };
    }
    return { customerId: id, error: null }; // No errors, return null
}