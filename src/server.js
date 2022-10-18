import express from 'express'
// import cors from 'cors'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'

const cors = require('cors');
import initWebRoutes from './route/web'
import connectDB from './config/connectDB'
import cookieParser from 'cookie-parser';
require('dotenv').config() // help run process.env

let app = express()

// app.use(bodyParser.json())
const  whitelist = [process.env.URL_WEBSITE, 'http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
  }
app.use(cors(corsOptions));
console.log(process.env.URL_WEBSITE)
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())

viewEngine(app)
initWebRoutes(app)

connectDB()

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log('backend nodejs is runing on the port: ', port)
})
