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
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
};
