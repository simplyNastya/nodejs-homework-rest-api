const express = require('express')

const contactsController = require('../../controllers/contacts-controllers')

const {validateBody} = require('../../utils')

const schemas = require('../../schemas/contacts')

const router = express.Router()

router.get('/', contactsController.listContacts)

// router.get('/:contactId', contactsController.getContactById)

// router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact)

// router.put('/:contactId', validateBody(schemas.contactPutSchema), contactsController.updateContactById)

// router.delete('/:contactId', contactsController.removeContact)

module.exports = router;