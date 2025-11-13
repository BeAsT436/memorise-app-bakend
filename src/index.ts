import express from 'express'
import { Config } from './config'
import { connectDB } from './db'
import routes from './routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(express.json())

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With, Accept, Content-Type, Authorization',
  )
  next()
})
connectDB()

app.use('/api', routes)

app.use(errorHandler)

app.listen(Config.PORT, () => {
  console.log('server running on port ', Config.PORT)
})
