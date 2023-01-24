const { mariaDb } = require('../config/conectToDb')

const createTableMariaDb = async () => {
  try {
    await mariaDb.schema.dropTableIfExists('products')
    await mariaDb.schema.createTable('products', table => {
      table.increments('id')
      table.string('title', 30).notNullable()
      table.integer('price')
      table.string('thumbnail', 100).notNullable()
 
    })
    console.log('Table created')
  } catch (err) {
    console.error(`No se ha podido crear la tabla`, err.message)
  }
}

module.exports = { createTableMariaDb }
