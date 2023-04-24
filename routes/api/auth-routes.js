const express = require('express')

const router = express.Router()

const { validateBody } = require('../../utils')

const { schemas } = require('../../models/user')

const authController = require('../../controllers/auth-controllers')

router.post('/register', validateBody(schemas.userRegisterSchema), authController.register)
router.post('/login', validateBody(schemas.userLoginSchema), authController.login)

module.exports = router