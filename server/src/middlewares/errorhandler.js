const logger = require('../../config/logger')

function errorHandler(err, req, res, next) {
    logger.error(`${req.method} ${req.originalUrl} - ${err.name}: ${err.message}`)

    if (
        err.name === 'SequelizeValidationError' ||
        err.name === 'SequelizeUniqueConstraintError'
    ) {
        return res.status(400).json({
            message: err.errors && err.errors[0] ? err.errors[0].message : 'Invalid data'
        });
    } else if (err.name === 'BadRequest') {
        return res.status(400).json({ message: err.message });
    } else if (err.name === 'Unauthorized') {
        return res.status(401).json({ message: err.message });
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    } else if (err.name === 'NotFound') {
        return res.status(404).json({ message: err.message });
    } else if (err.name === 'Forbidden') {
        return res.status(403).json({ message: err.message });
    } else if (err.name === 'ZodError') {
        const firstIssue = err.issues && err.issues[0];
        const message = firstIssue ? firstIssue.message : 'Invalid request data';
        return res.status(400).json({ message });
    }

    return res.status(500).json({ message: 'Internal server error' });
}

module.exports = errorHandler;
