import http from 'http'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import api from './routes/api'
import { initDb } from './db'
import config from './config.json'
import { asyncMiddleware } from './tools'


const app = express()

async function run() {
  app.server = http.createServer(app)

  app.use(morgan('dev'))

  app.use(bodyParser.json({
    limit: config.bodyLimit
  }))

  initDb().catch(error => console.error(`Database connection error: ${error.stack}`))


  app.get('/', async (req, res) => {
    res.json({
      status: 'success',
      result: `Express js is running on port ${config.port}`
    })
  })

  app.use('/api', api)
  app.get('/foo', asyncMiddleware(async function(req, res) {
    throw new Error('test')
    res.send('Hello, World!')
  }))

  app.use(async (req, res, /*next*/) => {
    res.status(404).format({
      // json: () => res.json({ error: 'Not found' }),
      default: () => res.json({
        status: 'failure',
        message: 'Not found'
      })
    })
  })

  app.server.listen(process.env.PORT || config.port, async () => {
    console.log(`Started on port ${app.server.address().port}`)
  })
}

run().catch(error => console.error(error.stack))

export default app
