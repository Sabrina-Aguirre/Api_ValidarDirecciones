const CARACTERES_PROHIVIDOS = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+']
const PALABRAS_REQUERIDAS = ['CALLE', 'AVENIDA', 'BULEVAR', 'PASAJE']
const NUMEROS_REQUERIDOS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const ABREVIATURAS = ['CL.', 'AV.', 'BLVD.', 'PZA.', 'PJE.', 'APTO.', 'DTO.']

const reglas = [
    {
        nombre: "Longitud",
        descripcion: "Longitud: La dirección debe tener entre 20 y 60 caracteres",
        validar: (direccion) => direccion.length >= 20 && direccion.length <= 60
    },
    {
        nombre: "Formato",
        descripcion: "Debe incluir un número de puerta o apartamento.",
        validar: (direccion) => NUMEROS_REQUERIDOS.some(n => direccion.includes(n))
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
    },
    {
        nombre: "Consistencia",
        descripcion: "El código postal (si existe) debe estar al final de la dirección.",
        validar: (direccion) => {
            const obtenerPalabras = (texto) => texto.split(/\s+/).filter(p => p !== '')
            const palabras = obtenerPalabras(direccion)
            const i = palabras.findIndex((p, k) =>
                k >= 1 &&
                p.toLowerCase() === 'postal' &&
                ['Codigo', 'codigo'].includes(palabras[k - 1].toLowerCase()) &&
                NUMEROS_REQUERIDOS(palabras[k + 1].length === 4 || palabras[k + 1].length === 5)
            )
            if(i === -1)
                return true
            return i + 1 === palabras.length -1
        }
    },
    {
        nombre: "Sin abreviaturas",
        descripcion: "No permite abreviaturas como Av. (debe ser Avenida)",
        validar: (direccion) => !direccion
            .split(/[\s.,]+/)
            .filter(p => p !== ' ')
            .map(p => p.toUpperCase())
            .some(p => ABREVIATURAS.includes(p))
    },
    {
        nombre: "Mayúsculas",
        descripcion: "La primera letra de cada palabra debe ser mayúscula.",
        validar: (direccion) => direccion
            .split(' ')
            .filter(p => p !== '')
            .every(p => p[0] === p[0].toUpperCase())
    }

]

const reglaValidacion = ({ direccion }) => reglas.every(regla => regla.validar(direccion))





module.exports = { reglaValidacion, reglas }