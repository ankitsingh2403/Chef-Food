// middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(status).json({
        success: false,
        message: message,
    });
};

module.exports = errorMiddleware;
