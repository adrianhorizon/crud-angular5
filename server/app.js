import express from 'express'
import bodyParser from 'body-parser'
import { question } from './routes'

const app = express()

app.use(bodyParser.json())

// servidor lea todo lo que viene con formato utf 8
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
      // cualquier dominio pueda acceder a la aplicacion
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    // llamar al siguiente middleware
    next()
  })
}

//dejamos por defecto que se muestre de primeras rutas por use, get, post y put
app.use('/api/questions', question)

export default app
