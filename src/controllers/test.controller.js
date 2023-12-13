


const test = ( req, res=Response )=>{
    console.log( 'Esto es una prueba de conexión del backend')
    return res.status(200).send({
         status: 'Ok',
         message: 'Esto es una prueba de conexión del backend'
    })
}

export const methods ={
    test
}