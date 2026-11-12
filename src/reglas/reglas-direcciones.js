const CARACTERES_PROHIVIDOS = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+']
const PALABRAS_REQUERIDAS = ['CALLE', 'AVENIDA', 'BULEVAR', 'PASAJE']
const NUMEROS_REQUERIDAS = [1,2,3,4,5,6,7,8,9]
const ABREVIATURAS = ['Ca.', 'Av.', 'Blv.', 'Pas.']

const reglas = [
    {
        nombre: "Longitud",
        descripcion: "Longitud: La dirección debe tener entre 20 y 60 caracteres",
        validar: (direccion) => direccion.length >= 20 && direccion.length <= 60
    },
    {
        nombre: "Formato",
        descripcion: "Debe incluir un número de puerta o apartamento.",
        validar: (direccion) => NUMEROS_REQUERIDAS.some(n => direccion.includes(n))
    },
    {
        nombre: "Caracteres-prohibidos",
        descripcion: "No puede contener símbolos como ! @ # $ % ^ & * ( ) _ +.",
        validar: (direccion) => !CARACTERES_PROHIVIDOS.some(c => direccion.includes(c))
    },
    {
        nombre: "Palabras-requeridas",
        descripcion: "Debe incluir al menos una de: Calle, Avenida, Bulevar, Pasaje.",
        validar: (direccion) => PALABRAS_REQUERIDAS.some(p => direccion.toUpperCase().includes(p))
    }
]

const reglaValidacion = ({ direccion }) => reglas.every(regla => regla.validar(direccion))




module.exports={reglaValidacion, reglas}