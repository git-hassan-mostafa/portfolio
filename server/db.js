import pg from 'pg'

const {Client } = pg;

export default new Client({
    connectionString: "postgres://default:ZVYcHsT9y3fU@ep-raspy-block-37592260-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})