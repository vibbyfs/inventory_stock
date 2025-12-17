function badRequest(message) {
    const err = new Error(message || 'Bad Request')
    err.name = 'BadRequest'
    return err
}

function unauthorized(message) {
    const err = new Error(message || 'Unauthorized')
    err.name = 'Unauthorized'
    return err
}

function forbidden(message) {
    const err = new Error(message || 'Forbidden')
    err.name = 'Forbidden'
    return err
}

function notFound(message) {
    const err = new Error(message || 'Not Found')
    err.name = 'NotFound'
    return err
}

module.exports = {
    badRequest,
    unauthorized,
    forbidden,
    notFound
}