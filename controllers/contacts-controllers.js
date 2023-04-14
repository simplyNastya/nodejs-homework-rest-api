const contactsService = require('../models/contacts')

const { HttpError } = require('../helpers')

const { ctrlWrapper } = require('../utils')


const listContacts = async (req, res) => {
    const result = await contactsService.listContacts()
  res.json(result)
}

const getContactById = async (req, res) => {
    const { contactId } = req.params
    const result = await contactsService.getContactById(contactId)
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`)
    }
    res.json(result)
}

const addContact = async (req, res) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
   }


const removeContact = async (req, res) => {
    const { contactId } = req.params
    const result = await contactsService.removeContact(contactId)
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`)
    }
    res.status(200).json({message: "contact deleted"})
  }


const updateContactById = async (req, res) => {
    const { contactId } = req.params
    const result = await contactsService.updateContactById(contactId, req.body)
    if (!result) {
      throw HttpError(404, 'missing fields')
    }
    if (JSON.stringify(req.body) === '{}') {
      throw HttpError(400, 'missing fields')
    }
    res.json(result)
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContactById: ctrlWrapper(updateContactById)
}