const { isValidObjectId } = require('mongoose')

const {HttpError} = require('../helpers')

const isValidId = (req, res, next) => {
    const { contactId } = req.params
    if (!isValidObjectId(contactId)) {
        next(HttpError(404, `Not found. ${contactId} is not valid id format`))
    }
    next()
}

module.exports = isValidId