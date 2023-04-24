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
  token: String
}, {versionKey: false})

userSchema.post('save', handleMangooseError)

const userRegisterSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string(),
});

const userLoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string(),
});

const schemas = {
    userRegisterSchema,
    userLoginSchema,
}

const User = model('user', userSchema)

module.exports = {
    User, 
    schemas,
}