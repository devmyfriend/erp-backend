# ERP-API

## Instalación
### 1. Clonar el repositorio
    $ git clone https://github.com/devmyfriend/erp-backend.git
### 2. Dependencias
```bash

# Para instalar dependencias ejecuta este comando en la raíz:
$ npm install

```
### 3. Credenciales

```bash
# Antes de ejecutar el servidor, asegurate de crear tu archivo .env

DB_USER=dev
DB_PASSWORD='Cyber2000'
DB_HOST=lachosoft.cloud
DB_NAME='erpmf'
DB_PORT=3307
PORT=3000

```
## Linter
#### Este proyecto tiene reglas de eslint y prettier configuradas, se re comienda instalar as extenciones respectivas en visual studio code:

#### Eslint : dbaeumer.vscode-eslint

![image](https://user-images.githubusercontent.com/85807291/223141938-3e1dc625-0ca6-4074-b227-9dcfb6aadf47.png)


#### Prettier : esbenp.prettier-vscode

![image](https://user-images.githubusercontent.com/85807291/223141790-e59a323f-834b-461f-bccf-c767ce136354.png)

## Configurar el formateador por defecto
```bash
# Dentro del IDE
Ctrl + Shift + P
# Seleccionar "Format Document With"
```
![imagen](https://github.com/devmfcancun/erp-js/assets/85807291/b784499d-94d7-47e9-a09f-c6324ae84ede)

```bash
# Seleccionar a prettier como formateador por defecto
```
![imagen](https://github.com/devmfcancun/erp-js/assets/85807291/a95c457b-c237-460e-abfa-4167ef9c0a91)


## Ejecutar el servidor
```bash
# Desarrollo:
$ npm run dev

# Modo producción:
$ npm run start

# Formatear el código en general

$ npm run lint
```



## Estructura de carpetas
```bash
├─ src
│   ├───controllers
│   │
│   ├───database
│   │
│   ├───models
│   │
│   ├───routes
│   │
│   └───schemas
│
├── .env
│
├── README
│
├── app.js
│
├── index.js
│
├── DockerFile
│ 
└── docke-compose.yaml
```
```bash
# en progreso...

```
## Swagger
#### Swagger es una herramienta usada para documentación de API y testing

#### Una vez la aplicacon se este ejecutando debe entrar en la siguiente URL:

    http://localhost:3000/api/


```bash
# en progreso...

```

## Formato de los commits
#### Nota:
    El merge de los pull request debe ser de tipo "Squash and merge"
![imagen](https://github.com/devmfcancun/erp-js/assets/85807291/e494d8e5-2c70-4ee0-aaf2-286d8ecd0103)


### Actualización de archivos existentes -> up

```bash
#Ejemplo

$ git commit -m 'up: mensaje en index.ts '

```

### Refractorización de archivos/carpetas existentes -> rf

```bash
#Ejemplo

$ git commit -m 'rf: se movieron los modulos a la carpta src/ y se actualizaron los imports '

```


### Agregar una nueva funcionalidad -> ft

```bash
#Ejemplo

$ git commit -m 'ft: ruta para obtener los paises agregada'

```

### Corrección de errores -> fix

```bash
#Ejemplo

$ git commit -m 'fix: conexion con la base de datos'

```

## Formato de las ramas



```bash
#Ejemplos

# Nueva funcionalidad
branch -> ft/modulo-contactos

# Bugs
branch -> fix/conexion-base-de-datos

#Refractorización 
branch -> rft/estructura-carpetas

```