export const dbConfig = {
  development: {
    dialect: "sqlite",
    storage: process.env.DB_PATH,
  },
  test: {
    dialect: "sqlite",
    storage: process.env.TEST_DB_PATH,
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
};
