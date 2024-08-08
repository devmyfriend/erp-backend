# API de Sucursales

## Endpoint: Actualizar Sucursal

### Descripción

Este endpoint permite actualizar los detalles de una sucursal existente, incluyendo su nombre, entidad de negocio asociada y domicilio.

### Método HTTP

`PATCH`

### URL

`/api/v1/sucursal/editar`

## Formato de Solicitud

La solicitud debe ser enviada en formato JSON y debe incluir dos campos principales: `sucursal` y `datos`.

### Estructura del JSON

```json
{
  "sucursal": [
    {
      "SucursalId": 1,
      "Nombre": "Sucursal Central",
      "EntidadNegocioId": 5,
      "ActualizadoPor": 3
    }
  ],
  "datos": [
    {
      "Calle": "Principal",
      "NumeroExt": "123",
      "NumeroInt": "A",
      "CodigoPostal": "45678",
      "Estado": "EST",
      "Municipio": "Benito Juárez",
      "Localidad": "LOC",
      "Colonia": "Hola soy una colonia",
      "Pais": "México"
    }
  ]
}
```

## Parámetros de la Solicitud

### sucursal: 
Arreglo de objetos que contienen los detalles de la sucursal a actualizar.

### SucursalId (integer): 
ID de la sucursal a actualizar.

### Nombre (string): 
Nuevo nombre de la sucursal.

### EntidadNegocioId (integer): 
ID de la entidad de negocio asociada.

### ActualizadoPor (integer): 
ID del usuario que actualiza la sucursal.

### datos: 
Arreglo de objetos que contienen los detalles del domicilio de la sucursal.

### Calle (string): 
Calle de la sucursal.

### NumeroExt (string): 
Número exterior de la sucursal.

### NumeroInt (string): 
Número interior de la sucursal.

### CodigoPostal (string): 
Código postal de la sucursal.

### Estado (string): 
Clave del estado.

### Municipio (string): 
Clave del municipio.

### Localidad (string): 
Clave de la localidad.

### Colonia (string): 
Clave de la colonia.

#### Pais (string): 
Clave del país.

## Respuestas
### 200 OK

La sucursal y su domicilio fueron actualizados exitosamente.
Ejemplo de respuesta:
```json
{
  "status": "OK",
  "message": "Sucursal actualizada correctamente",
  "data": {
    "sucursal": {
      "SucursalId": 1,
      "Nombre": "Sucursal Central",
      "EntidadNegocioId": 5,
      "ActualizadoPor": 3
    },
    "domicilio": {
      "Calle": "Principal",
      "NumeroExt": "123",
      "NumeroInt": "A",
      "CodigoPostal": "45678",
      "Estado": "EST",
      "Municipio": "Benito Juárez",
      "Localidad": "LOC",
      "Colonia": "Hola soy una colonia",
      "Pais": "México"
    }
  }
}
```

### 400 Bad Request

Los datos proporcionados no son válidos.
Ejemplo de respuesta:

```json
{
  "status": "Error de validación",
  "errors": ["Mensaje de error 1", "Mensaje de error 2"]
}
```
### 404 Not Found

La sucursal o el domicilio no se encontraron.
Ejemplo de respuesta:

```json
{
  "status": "Error",
  "message": "Sucursal no encontrada"
}
```
### 409 Conflict

El nombre de la sucursal ya está en uso.
Ejemplo de respuesta:

```json
{
  "status": 409,
  "message": "El nombre de la sucursal ya está en uso"
}
```

### 500 Internal Server Error

Error del servidor al actualizar la sucursal.
#### Ejemplo de respuesta:

```json
{
  "status": "Error",
  "message": "Error al actualizar la sucursal",
  "error": "Detalles del error"
}
```

## Función editarSucursal
La función editarSucursal maneja la lógica para actualizar una sucursal y su domicilio en la base de datos. A continuación, se detalla el proceso:

### Validación de la Sucursal:

Se verifica si la sucursal existe en la base de datos utilizando validarSucursal.
Si la sucursal no existe, se retorna un error 404.
Validación del Nombre de la Sucursal:

Se verifica si el nuevo nombre de la sucursal ya está en uso utilizando validarNombreSucursal.
Si el nombre ya está en uso, se retorna un error 409.
Validación del Domicilio:

Se busca el domicilio de la sucursal utilizando buscarDomicilioSucursal.
Si no se encuentra el domicilio, se retorna un error 404.
Actualización de la Sucursal:

Se actualiza la información de la sucursal utilizando el modelo Sucursal y los datos proporcionados en la solicitud.
Actualización del Domicilio:

Se actualiza la información del domicilio utilizando el modelo Domicilio y los datos proporcionados en la solicitud.
Respuesta Exitosa:

Si todas las actualizaciones son exitosas, se retorna una respuesta 200 con un mensaje de éxito y los datos actualizados de la sucursal y el domicilio.
Manejo de Errores:

Si ocurre algún error durante el proceso, se retorna un error 500 con un mensaje de error y los detalles del mismo.

## Ejemplo de Uso
Para actualizar una sucursal, se debe enviar una solicitud 
PATCH a /api/v1/sucursal/editar con el siguiente cuerpo JSON:

```json
{
  "sucursal": [
    {
      "SucursalId": 1,
      "Nombre": "Sucursal Central",
      "EntidadNegocioId": 5,
      "ActualizadoPor": 3
    }
  ],
  "datos": [
    {
      "Calle": "Principal",
      "NumeroExt": "123",
      "NumeroInt": "A",
      "CodigoPostal": "45678",
      "Estado": "EST",
      "Municipio": "Benito Juárez",
      "Localidad": "LOC",
      "Colonia": "Hola soy una colonia",
      "Pais": "México"
    }
  ]
}
```

Si la solicitud es exitosa, se recibirá una respuesta similar a la siguiente:

```json

{
  "status": "OK",
  "message": "Sucursal actualizada correctamente",
  "data": {
    "sucursal": {
      "SucursalId": 1,
      "Nombre": "Sucursal Central",
      "EntidadNegocioId": 5,
      "ActualizadoPor": 3
    },
    "domicilio": {
      "Calle": "Principal",
      "NumeroExt": "123",
      "NumeroInt": "A",
      "CodigoPostal": "45678",
      "Estado": "EST",
      "Municipio": "Benito Juárez",
      "Localidad": "LOC",
      "Colonia": "Hola soy una colonia",
      "Pais": "México"
    }
  }
}
```