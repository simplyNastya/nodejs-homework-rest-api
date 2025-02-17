const { Schema, model } = require('mongoose')
const { handleMangooseError } = require('../helpers')

const Joi = require('joi')

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field'
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing required email field'
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field'
  }),
  favorite: Joi.boolean()
})

const contactPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).options({ allowUnknown: false });
 
const contactPatchSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
    'any.required': 'missing field favorite'
  })
 })

const schemas = {
    contactAddSchema,
    contactPutSchema,
    contactPatchSchema,
}

const contactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    }
}, {versionKey: false})
  
contactSchema.post('save', handleMangooseError)

const Contact = model('contact', contactSchema)

module.exports = {
    Contact,
    schemas,
};