const express = require('express')
const app = express()
const PORT = process.env.PORT || 3004
const clientes = require('./data/clientes.json')
const { reglas } = require('./reglas/reglas-direcciones')

const formaterCliente = ({ id, direccion, ...resto }) => resto

app.get('/direcciones-validas', (req, res) => {
    const validos = clientes.filter(({ direccion }) => reglas.every(regla => regla.validar(direccion)))
    const formateados = validos.map(formaterCliente)
    res.status(200).json(formateados)
})

app.listen(PORT, () => {
    console.log(`La app esta inicializada en el puerto ${PORT}`)
})