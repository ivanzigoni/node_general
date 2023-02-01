module.exports = {
  env: {
    ...process.env,
    POSTGRES_PORT: +process.env.POSTGRES_PORT,
    POSTGRES_DATABASE_NAME: process.env.POSTGRES_DATABASE_NAME || "sample_database"
  }
}
