const express = require('express')

const router = express.Router()

const { validateBody } = require('../../utils')

const { schemas } = require('../../models/user')

const authController = require('../../controllers/auth-controllers')

const { authenticate } = require('../../middlewares')

router.post('/register', validateBody(schemas.userRegisterSchema), authController.register)
router.post('/login', validateBody(schemas.userLoginSchema), authController.login)
router.get('/current', authenticate, authController.getCurrent) 
router.post('/logout', authenticate, authController.logout)

module.exports = router