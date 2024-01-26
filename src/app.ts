import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

const bodyParser = require('body-parser')
const compression = require('compression')
import * as middlewares from './middlewares'
import api from './api'
import MessageResponse from './interfaces/MessageResponse'

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(
  compression({
    level: 6,
  })
)
app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Welcome to the AlertSite Technical benchmark API 🌎✨👋',
  })
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Api Directory../api/io_alert',
  })
})

app.use('/api/', api)

app.use(middlewares.notFound)
// app.use(middlewares.errorHandler)

export default app
