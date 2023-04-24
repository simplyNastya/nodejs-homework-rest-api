const express = require('express')

const contactsController = require('../../controllers/contacts-controllers')

const { validateBody } = require('../../utils')

const { schemas } = require('../../models/contact')

const { isValidId, authenticate } = require('../../middlewares')

const router = express.Router()

router.use(authenticate)

router.get('/', contactsController.listContacts)

router.get('/:contactId', isValidId, contactsController.getContactById)

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact)

router.put('/:contactId', isValidId, validateBody(schemas.contactPutSchema), contactsController.updateContactById)

router.delete('/:contactId', isValidId, contactsController.removeContact)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.contactPatchSchema), contactsController.updateStatusContact)

module.exports = router;