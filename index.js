const express = require('express')
const {default:mongoose} = require('mongoose')
const app = express()
const port = 3000
require('dotenv').config()
const routerApi = require('./src/routes')

app.listen(port, () => console.log("Active port", port))

mongoose
        .connect(process.env.MONGODB_CONNECTION_STRING)
        .then(() => console.log('Connect with MongoDB'))
        .catch((error) => console.error(error))

/*Middleware */
app.use(express.json())
routerApi(app)
