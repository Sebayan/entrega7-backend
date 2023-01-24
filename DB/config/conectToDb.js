const knex = require('knex');

const mariaDb = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'ecommerce',
  }
})


const sqlite3Db = knex({
  client: 'sqlite3',
  connection: { filename: 'ecommerce.sqlite' },
  useNullAsDefault: true
})

module.exports = { mariaDb, sqlite3Db }