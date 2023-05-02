const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const sgMail = require('@sendgrid/mail')
require('dotenv').config()

// const { SENDGRID_API_KEY } = process.env

// sgMail.setApiKey(SENDGRID_API_KEY)

// const email = {
//   to: 'woxaho4740@pixiil.com',
//   from: 'koretska.anastasiia@gmail.com',
//   subject: 'Test email',
//   // text: 'and easy to do anywhere, even with Node.js',
//   html: '<p><strong>Test email</strong> from localhost:3000</p>',
// }

// sgMail.send(email)
//   .then(() => {
//     console.log('Email send success');
//   })
//   .catch(error => {
//     console.error(error);
//   });

const contactsRouter = require('./routes/api/contacts-routes')
const authRouter = require('./routes/api/auth-routes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/contacts', contactsRouter)
app.use('/users', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message })
})

module.exports = app
