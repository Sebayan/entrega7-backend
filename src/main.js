const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const productRouter = require('../routes/productRouter')
const path = require ("path")

const { chat, products } = require('../class/productsClass')


const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))


io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!')

  
  socket.emit('productos', await products.getAll())
 
  socket.on('update', async producto => {
    await products.add( producto )
    io.sockets.emit('productos', await products.getAll())
  })

  socket.emit('mensajes', await chat.getAll());

  socket.on('newMsj', async mensaje => {
      mensaje.date = new Date().toLocaleString()
      await chat.add( mensaje )
      io.sockets.emit('mensajes', await chat.getAll());
  })

})

app.use('/api', productRouter)


const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))