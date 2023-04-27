const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleMangooseError } = require('../helpers')

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String,
  avatarURL: String,
}, {versionKey: false})

userSchema.post('save', handleMangooseError)

const userRegisterLoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string(),
    avatarURL: Joi.string(),
});

const userSubscriptionSchema = Joi.object({
    subscription: Joi.string().regex(/^(starter|pro|business)$/).required().messages({
    'any.required': 'missing field subscription'
  })
});

const schemas = {
  userRegisterLoginSchema,
  userSubscriptionSchema,
}

const User = model('user', userSchema)

module.exports = {
    User, 
    schemas,
}