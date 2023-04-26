const { Contact } = require('../models/contact')

const { HttpError } = require('../helpers')

const { ctrlWrapper } = require('../utils')

const listContacts = async (req, res) => {
  const { _id: owner } = req.user
  console.log(req.query)
  const { page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit
  const result = await Contact.find({owner}, '', {skip, limit}).populate('owner')
  res.json(result)
}

const getContactById = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`)
    }
    res.json(result)
}

const addContact = async (req, res) => {
    const {_id: owner} = req.user
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
   }


const removeContact = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`)
    }
    res.status(200).json({message: "contact deleted"})
  }


const updateContactById = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`)
    }
    if (JSON.stringify(req.body) === '{}') {
      throw HttpError(400, 'missing fields')
    }
    res.json(result)
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!result) {
    throw HttpError(404, 'Not found')
  }
   if (JSON.stringify(req.body) === '{}') {
      throw HttpError(400, 'missing field favorite')
    }
  res.json(result)
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
}