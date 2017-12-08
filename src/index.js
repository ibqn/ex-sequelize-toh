import http from 'http'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import api from './routes/api'
import sequelize from './db'
import config from './config.json'


const app = express()
app.server = http.createServer(app)

app.use(morgan('dev'))


app.use(bodyParser.json({
	limit: config.bodyLimit
}))

app.get('/', async (req, res) => {
  res.json({
    status: 'ok',
    result: `Express js is running on port ${config.port}`
  })
})

app.use('/api', api)

app.use(async (req, res, /*next*/) => {
  res.status(404).format({
    // json: () => res.json({ error: 'Not found' }),
    default: () => res.json({ error: 'Not found' })
  })
})

app.server.listen(process.env.PORT || config.port, async () => {
  console.log(`Started on port ${app.server.address().port}`)
})

export default app
