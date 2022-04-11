const sgMail = require('@sendgrid/mail')
const express = require('express')
const { default: mongoose } = require('mongoose')
const { logErrors, errorHandler, boomErrorHandler } = require('./src/handlers/error.handler')
const app = express()
const port = 3000
require('dotenv').config()

/*Importar a Twilio */
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const twilio_client = require('twilio')(accountSID, authToken);
const sgMailSendGrid = require('./src/emailSendGrid/emailSendGrid')

/*Función para enviar SMS */
twilio_client.messages
  .create({
    body: 'Prueba desde la app del uso de twilio',
    from: '+18643875987',
    to: '+573218791977',
  }).then(message => console.log(`Mensaje enviado ${message.sid}`))

const routerApi = require('./src/routes')

app.listen(port, () => console.log("Active port", port))

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Connect with MongoDB'))
  .catch((error) => console.error(error))

/*Middleware */
app.use(express.json())
app.use(express.urlencoded({extended: false}))

/*Función para envío de correo electrónico */
app.post('/api/v1/confirmacion', async (req, res, next)=>{
  try {
    res.json(await sgMailSendGrid.sendOrderSerie(req.body))
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) =>{
  const statusCode = err.statusCode || 500
  console.error(err.message, error.stack)
  res.status(statusCode).json({message: err.message})
  return
})

app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)
routerApi(app)
