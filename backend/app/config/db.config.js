export const dbConfig = {
  development: {
    dialect: "sqlite",
    storage: "db.sqlite",
  },
  test: {
    dialect: "sqlite",
    storage: "db_test.sqlite",
    logging: false,
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
};
