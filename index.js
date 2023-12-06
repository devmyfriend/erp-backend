require( 'dotenv' ).config()

const express = require( 'express' )

const cors = require( 'cors' )

const app = express()

const Mariadb = require( './database/mariadb.database' )

app.use( cors() )

app.use( express.json() )

Mariadb.Conexion().then()

//zona de rutas

const ruta ={
    test: '/api/v1/test',
    pais: '/api/v1/pais',
    contacto :'/api/v1/contacto'
}

app.use( ruta.test, require( './routes/test.routes' ) )
app.use( ruta.pais, require( './routes/pais.routes' ) )
app.use( ruta.contacto, require( './routes/contacto.routes' ) )

//fin de zona de rutas

const puerto = process.env.PORT || 3000

app.listen( puerto, ()=>{
    console.log( `El servidor esta en line y escucha por el puert ${ puerto }` )
}) 


