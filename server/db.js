import pg from 'pg'
import dotenv from 'dotenv'
const {Client } = pg;
dotenv.config()

export default new Client({
    connectionString:process.env.CONNECTION_STRING
})