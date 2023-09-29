import pg from 'pg'

const { Pool } = pg;

export default new Pool({
    idleTimeoutMillis:20000,
    connectionString: "postgres://default:ZVYcHsT9y3fU@ep-raspy-block-37592260-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})