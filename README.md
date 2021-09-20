# API Restful - NodeJS/ExpressJS + MongoDB

## Requirements
```sh
Desarrollar un API REST con las siguientes funcionalidades:
    a. Registro de usuario.
    b. Login de usuario.
    c. Crear un endpoint para los usuarios logueados el cual reciba una ciudad (o unas coordenadas) y retorne una lista de los restaurantes cercanos a esta ciudad o coordenadas. Puedes utilizar algún API público para esto.
    d. Crear un endpoint donde puedes consultar la lista de las transacciones realizadas históricamente.
    e. Logout de usuario.
```

### Nice to have for this test:
```sh
1. Bono si todo se puede correr localmente desde docker con docker-compose.
2. ... Nuestro equipo utiliza Node JS entonces puntos extra si es en este lenguaje.
```

## Docker
To execute with docker, after cloned or copied this project, just neccesary the next command in your terminal:
```sh
docker-compose up -d --build
```

## Authentication
The secret JsonWebToken you can change it in .env file located in root path, by default is:
```sh
|I|am|A|Complex|Secret|
```

After you login, you will received a token with 20 minutes to expire, for example:
```sh
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTk1NzQ5Nzh9.IBf_k91pnZq1now5rIOH4SIS8tY1maxo45vOzB2F5oU
```

In the header authorization you must send your token generated, for example:
```sh
authorization: Bearer token
```

## API Endpoints
| Method | Request | Endpoint | Body Example | Succes Response Example | Error Response Example |
| ------ | ------ | ------ | ------ | ------ | ------ |
| POST | Create User | ```/api/v1/users``` |  ``` { email:'email@domain.com', password:'Password!@#?]', fullname:'First LastName' } ``` | ``` ok: true ``` | ``` errors: [ "User email already exists" ] ``` |
| POST | Create Log In | ```/api/v1/users/login``` | Empty | ``` { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaGFuQGpvaGFuLmNvbSIsImlhdCI6MTYyOTcwMjIzOSwiZXhwIjoxNjI5NzAyMjM5fQ.mxHg3gYsbEYXQa7jjziNUIaFodUywlJ6D8syxlUtIKU" } ``` | ``` errors: [ "Invalid email or password, doesnt match" ] ``` |
| GET | Get Restaurant | ```/api/v1/restaurants``` |  Empty | ``` [ { "name": "The Little Snail Restaurant", "location": {     "lat": -33.8703417,     "lng": 151.1979222 }    },    { "name": "Flying Fish - Pick Up & Delivery Available", "location": {     "lat": -33.8683472,     "lng": 151.1962233 }    } ] ``` | ``` { errors: [ { "name": "TokenExpiredError", "message": "jwt expired", "expiredAt": "2021-08-23T07:16:32.000Z" } ] } ``` |
| GET | Get Restaurants History | ```/api/v1/restaurants/history``` |  Empty | ``` [ { "response": [ { "error_message": "The provided API key is invalid.", "status": "REQUEST_DENIED" } ], "_id": "5SWLUfVJw", "created_at": "2021-09-20T00:12:57.627Z", "__v": 0    } ] ``` | ``` { errors: [ { "name": "TokenExpiredError", "message": "jwt expired", "expiredAt": "2021-08-23T07:16:32.000Z" } ] } ``` |

### How to use?
1.- To install npm packages:
```sh
npm install
```

2.- To run app, use the text command:
```sh
npm run start
```

3.- Optional, debug mode:
```sh
npm run debug
```

4.- Optional, run tests:
```sh
npm test
```
