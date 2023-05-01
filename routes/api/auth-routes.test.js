const mongoose = require('mongoose')
const app = require('../../app')
const request = require('supertest')

const { PORT, DB_HOST_TEST } = process.env

const { User } = require('../../models/user')

describe('test auth route', () => {
    let server = null

    beforeAll(async () => {
        server = app.listen(PORT)
        await mongoose.connect(DB_HOST_TEST)
    })

    afterAll(async () => {
        server.close()
        await User.deleteMany({})
        await mongoose.connection.close()
    })

    beforeEach(() => {
    })

    afterEach(async () => {   
    })

    test('register correct data', async () => {
        const registerData = {
            password: 'Anastasiia',
            email: 'koretska.anastasiia@gmail.com',
            subscription: 'starter'
        }

        const response = await request(app).post('/users/register').send(registerData)
        expect(response.statusCode).toBe(201)
        expect(response.body.user.email).toBe(registerData.email)
        expect(response.body.user.subscription).toBe(registerData.subscription)
        expect(typeof response.body.user.email).toBe('string')
        expect(typeof response.body.user.subscription).toBe('string')

        const user = await User.findOne({ email: registerData.email })
        expect(response.body.user.email).toBe(user.email)
        expect(response.body.user.subscription).toBe(user.subscription)
    })

    test('login correct data', async () => {
        const loginData = {
            password: 'Anastasiia',
            email: 'koretska.anastasiia@gmail.com',
            subscription: 'starter'
        }

        const response = await request(app).post('/users/login').send(loginData)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('token')
        expect(response.body.user).toHaveProperty('email')
        expect(response.body.user).toHaveProperty('subscription')
        expect(typeof response.body.user.email).toBe('string')
        expect(typeof response.body.user.subscription).toBe('string')
        expect(response.body.user.email).toBe(loginData.email)
        expect(response.body.user.subscription).toBe(loginData.subscription)

        const user = await User.findOne({ email: loginData.email })
        expect(response.body.user.email).toBe(user.email)
        expect(response.body.user.subscription).toBe(user.subscription)
        expect(response.body.user.token).toBe(user.token)
    })
})