import config from './config'
import express from 'express'
import { createServer } from 'http'
import helmet from 'helmet'
import cors from 'cors'
import router from './application/routes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const CLIENT_URL = config.CLIENT_URL || '*'
app.use(
  cors({
    origin: CLIENT_URL,
  })
)

app.use(helmet())
app.use(router)

// for socket io server (if used)
const httpServer = createServer(app)

export default httpServer
