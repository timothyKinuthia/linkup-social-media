const ErrorResponse = require('../utils/errorResponse');



const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    if (err.code === 11000) {
        const message = "Duplicate field values entered!";

        error = new ErrorResponse(message, 400);
    }

    if (err.message === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);

        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({msg: error.message || "Server error!"})
}

module.exports = errorHandler;