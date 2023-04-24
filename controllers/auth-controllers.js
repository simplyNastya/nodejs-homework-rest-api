const { User } = require('../models/user')

const { ctrlWrapper } = require('../utils')

const { HttpError } = require('../helpers')

const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcryptjs.hash(password, 10)
    
    const newUser = await User.create({...req.body, password: hashPassword})
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    }) 
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }
    
    const passworCompare = await bcryptjs.compare(password, user.password)
    if (!passworCompare) {
        throw HttpError(401, "Email or password is wrong")
    }
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'})
    res.json({
        token,
        email: user.email,
        subscription: user.subscription,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}