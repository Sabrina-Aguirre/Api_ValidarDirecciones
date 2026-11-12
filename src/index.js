const express = require('express')
const app = express()
const PORT = process.env.PORT || 3004
const clientes = require('./data/clientes.json')
const { reglaValidacion, reglas } = require('./reglas/reglas-direcciones')

const formaterCliente = ({ id, direccion, ...resto }) => resto

app.get('/direcciones-validas', (req, res) => {
    const validos = clientes.filter(reglaValidacion)
    const formateados = validos.map(formaterCliente)
    res.status(200).json(formateados)
})

app.get('/direcciones-invalidas', (req, res) => {
    const validos = clientes.filter(reglaValidacion)
    const invalidos = clientes.filter(c => !validos.includes(c))
    const conErrores = invalidos.map(c => {
        return { ...c, error: reglas.filter(regla => !regla.validar(c.direccion)).map(r => r.descripcion) }
    })
    res.status(200).json(conErrores)
})
app.listen(PORT, () => {
    console.log(`La app esta inicializada en el puerto ${PORT}`)
})