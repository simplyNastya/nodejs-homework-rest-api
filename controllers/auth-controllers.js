const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const path = require('path')

const gravatar = require('gravatar')

const { User } = require('../models/user')

const { ctrlWrapper } = require('../utils')

const { HttpError, renameUploadFile } = require('../helpers')

const avatarsDir = path.resolve('public', 'avatars')

const {SECRET_KEY} = process.env

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcryptjs.hash(password, 10)

    const avatarURL = gravatar.url(email)
    
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL})
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
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
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
    await User.findByIdAndUpdate(user._id, { token })
    
    res.json({
        user: {
            token,
            email: user.email,
            subscription: user.subscription,
        }
    })
}

const getCurrent = async (req, res) => {
    const {email, subscription} = req.user
    res.json({
        email,
        subscription
    })
}

const logout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { token: '' }) 
    
    res.status(204).json({
        message: 'Logout success'
    })
}

const updateSubscriptionContact = async (req, res) => {
  const { _id } = req.user
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true })
  if (!result) {
    throw HttpError(404, 'Not found')
  }
   if (JSON.stringify(req.body) === '{}') {
      throw HttpError(400, 'missing field favorite')
    }
  res.json(result)
}

const updateUserAvatar = async (req, res) => {
    const {file} = req
    await renameUploadFile(file, avatarsDir)
    const {_id} = req.user

    const avatarURL = path.join('avatars', file.filename)

    await User.findByIdAndUpdate(_id, { avatarURL })
    
    res.json({
        avatarURL,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscriptionContact: ctrlWrapper(updateSubscriptionContact),
    updateUserAvatar: ctrlWrapper(updateUserAvatar),
}