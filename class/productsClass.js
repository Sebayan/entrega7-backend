const knex = require('knex')


class Contanier {

  constructor( config, dbTable ) {
      this.config = config
      this.dbTable = dbTable
  }
  
  async getAll() {
    try{
      const itemsInDb = await knex(this.config).from(this.dbTable).select('*')
      knex(this.config).destroy()
      return itemsInDb
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }
 
  
  async add( item ) {
    try{
      await knex(this.config)(this.dbTable).insert( item )
      knex(this.config).destroy()
      return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async modifyById( id, item ) {  
    try {
      const correctId = await knex(this.config)(this.dbTable).where('id', id).count()
      if (correctId[0]['count(*)'] > 0){
        await knex(this.config)(this.dbTable).where('id', id).update( item )
        knex(this.config).destroy()
        return true
      } else {
        knex(this.config).destroy()
        return false
      }
    } catch(err) {
      console.log(`Error: ${err}`)
      return false
    }
  }


  async getById( id ) {
    try {
      const product = await knex(this.config).select('title', 'price', 'thumbnail')
      .from(this.dbTable).where('id', id).first()
      console.log(product)
      return product ? product : null

    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async deleteById( id ) {  
    try {
      const correctId = await knex(this.config)(this.dbTable).where('id', id).count()
      if (correctId[0]['count(*)'] > 0){
        await knex(this.config)(this.dbTable).where('id', id).del()
        knex(this.config).destroy()
        return true
      } else {
        knex(this.config).destroy()
        return false
      }
    } catch(err) {
      console.log(`Error: ${err}`)
      return false
    }
  }


  async deleteAll() {
    await knex(this.config)(this.dbTable).del()
  }

}


const chat = new Contanier( 
  {
      client: 'sqlite3',
      connection: { filename: './db/sqlite3db/ecommerce.sqlite' },
      useNullAsDefault: true
  },
  'chat'
)

const products = new Contanier(
  {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        database: 'ecommerce'}
  },
  'products'
)



module.exports = { chat, products }