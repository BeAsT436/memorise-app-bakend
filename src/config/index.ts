import 'dotenv/config'

const PORT = Number(process.env.PORT) || 3001
const URI = process.env.MONGODB_URI || ''

export const Config = { PORT, URI }
