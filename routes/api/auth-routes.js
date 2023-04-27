const express = require('express')

const router = express.Router()

const { validateBody, ctrlWrapper } = require('../../utils')

const { schemas } = require('../../models/user')

const authController = require('../../controllers/auth-controllers')

const { authenticate, upload } = require('../../middlewares')

router.post('/register', validateBody(schemas.userRegisterLoginSchema), authController.register)

router.post('/login', validateBody(schemas.userRegisterLoginSchema), authController.login)

router.get('/current', authenticate, authController.getCurrent) 

router.post('/logout', authenticate, authController.logout)

router.patch('/subscription', authenticate, validateBody(schemas.userSubscriptionSchema), authController.updateSubscriptionContact)

router.patch('/avatars', authenticate, upload.single('avatar'), authController.updateUserAvatar )

module.exports = router