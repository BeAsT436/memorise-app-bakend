import express, { Router } from 'express'
import { Config } from './config'
import { connectDB } from './db'
import routes from './routes'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With, Accept, Content-Type, Authorization',
  )
  next()
})
connectDB()

app.use('/api', routes)

app.listen(Config.PORT, () => {
  console.log('server running on port ', Config.PORT)
})
