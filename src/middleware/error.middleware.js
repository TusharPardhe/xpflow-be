const config = require('../config');

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    const response = {
        error: err.message || 'Something went wrong!',
    };

    if (config.nodeEnv === 'development') {
        response.stack = err.stack;
    }

    res.status(err.status || 500).json(response);
};

module.exports = errorMiddleware;
