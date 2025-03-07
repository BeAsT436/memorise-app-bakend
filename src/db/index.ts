import mongoose from 'mongoose'
import { Config } from '../config'

export const connectDB = async () => {
  try {
    await mongoose.connect(Config.URI)
    console.log('mongodb connected')
  } catch (error) {
    console.error('mongodb connection error', error)
    process.exit(1)
  }
}
