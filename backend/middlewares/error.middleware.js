const errorMiddleware = (err, req, res, next) => {
    try{
        let customError = {
            statusCode: err.statusCode || 500,
            message: err.message || 'Internal Server Error'
        };

        console.error('Error:', err);

        // Handle invalid MongoDB ObjectId
        if (err.name === 'CastError') {
            customError.message = 'Resource not found';
            customError.statusCode = 404;
        }

        // Handle duplicate key error (e.g. unique email)
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue);
            customError.message = `Duplicate field value entered for: ${field}`;
            customError.statusCode = 400;
        }

        // Handle Mongoose validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            customError.message = messages.join(', ');
            customError.statusCode = 400;
        }

        // Custom pub-sub or external service error (Redis, AI API)
        if (err.name === 'ExternalServiceError') {
            customError.message = `External Service Error: ${err.message}`;
            customError.statusCode = err.statusCode || 502;
        }

        // Auth errors
        if (err.name === 'UnauthorizedError' || err.message === 'jwt malformed') {
            customError.message = 'Invalid or missing authentication token';
            customError.statusCode = 401;
        }

        // Send error response
        return res.status(customError.statusCode).json({
            success: false,
            error: customError.message
        });
    } catch (err) {
        next(err);
    }
};

export default errorMiddleware;