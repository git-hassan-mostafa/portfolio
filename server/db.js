import pg from 'pg'
import dotenv from 'dotenv'
const {Pool } = pg;
dotenv.config()

export default new Pool({
    min:0,
    connectionString:process.env.CONNECTION_STRING
})