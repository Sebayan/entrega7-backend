const { mariaDb } = require('./config/conectToDb')
const { createTableMariaDb } = require("./model/mariaDbmodel")

const executeOperations = async () => {
  try {
    await createTableMariaDb()
  } catch (err) {
    console.error(`No se ha podido crear la tabla`, err.message)
  } finally {
    mariaDb.destroy()
  }
}

executeOperations()