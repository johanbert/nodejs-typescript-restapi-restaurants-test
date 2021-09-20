# API Restful - NodeJS/ExpressJS + MongoDB

## Requirements
```sh
1. Create a registration service that receives an email and a password.
    a. Validate email is a valid email address.
    b. Validate email is not already registered in the database.
    c. Validate password contains at least 10 characters, one lowercase letter, one
    uppercase letter and one of the following characters: !, @, #, ? or ].
    d. If any of the above is not valid, send back a meaningful response.
2. Allow login into the server with an email and a password.
    a. Validate email is a valid email address
    b. Validate email is already registered in the database
    c. Validate password contains at least 10 characters, one lowercase letter, one
    uppercase letter and one of the following characters: !, @, #, ? or ].
    d. Validate email and password matches for a previous registered user.
    e. If any of the above is not valid send back a meaningful response.
    f. If all of the above are valid send back a payload including some way for users to
    identify themselves for subsequent requests. That way to identify users should be
    invalid after 20 minutes and the user must login again to continue communication
    with the server.
3. Allow logged in users to do CRUD operations into a table/collection of the topic you
picked above.
    a. Users should be able to create a new element that can only be retrieved by
    themselves (Private item).
    b. Users should be able to read all public elements in the table/collection.
    c. Users should be able to read all elements created by themselves.
    d. Users should be able to edit at least one field in one of their private items.
    e. Users should be able to delete their private items by id or all at once.
    f. Users should be able to like one of the public elements in the table/collection
    g. Users should be able to retrieve a list with all their liked public elements.
    h. Validate that users are trying to read, update or delete their own private
    elements, otherwise send a meaningful response.
```
## Must have for this test:
```sh
1. A git repository with the code and a README.md explaining how to run the code in the
reviewer computer with very clear steps.
2. Create the models for the selected topic with at least 5 meaningful fields.
3. Prefill the public elements with a list you built previously
4. Read requests must support pagination
```

### Nice to have for this test:
```sh
1. Implement what you would consider a good architecture.
2. Implement requirements using well known standards.
3. Create a meaningful documentation for potential clients that would use the API
4. Unit testing
5. Add an endpoint that requires your server to retrieve a random number from a public API
and send it back to the user.
6. Bonus: The API is deployed in a publicly accessible UR
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
| POST | Create Pokemon | ```/api/v1/pokemons``` |  ``` { name: 'Mew', level: 80, type: 'Normal' } ``` | ``` { id: "BKOD1V4R0" } ``` | ``` { errors: [ { "name": "TokenExpiredError", "message": "jwt expired", "expiredAt": "2021-08-23T07:16:32.000Z" } ] } ``` |
| GET | Get Pokemon | ```/api/v1/pokemon?limit=2&page=0``` |  Empty | ``` [ { "_id": "e_-SCTOHe", "type": "Normale", "userId": "pyX-ri6_h", "publicAccess": false, "likes": 0, "__v": 0 } ] ``` | ``` { errors: [ { "name": "TokenExpiredError", "message": "jwt expired", "expiredAt": "2021-08-23T07:16:32.000Z" } ] } ``` |
| PATCH | Update Pokemon | ```/api/v1/pokemons``` |  ``` { pokemonId: 'BKOD1V4R0', name: 'Mewtwo', level: 81, type: 'Physic' } ``` | ``` {    "_id": "kpL3fEk9Q",    "name": "Mew",    "type": "Normale",    "userId": "pyX-ri6_h",    "publicAccess": false,    "likes": 0,    "level": 20,    "__v": 0 } ``` | ``` { errors: [ { "name": "TokenExpiredError", "message": "jwt expired", "expiredAt": "2021-08-23T07:16:32.000Z" } ] } ``` |
| DELETE | Delete Pokemon | ```/api/v1/pokemons/pokemonId``` |  Empty | ``` { "id": {  "n": 1, "ok": 1, "deletedCount": 1 } } ``` | ``` { "errors": [ "pokemonId doesnt exists" ] } ``` |
| POST | Do Like/Dislike | ```/api/v1/likes/``` |  ``` { pokemonId: 'a5' } ``` | ``` { "pokemon": { "_id": "a2", "name": "Charizard", "level": 50, "type": "Fire", "userId": null, "likes": 0,   "publicAccess": true }, "like": { "_id": "612385fba81062485a4016ec", "pokemonId": "a2", "userId": "pyX-ri6_h", "__v": 0, "active": false } } ``` | ``` { "errors": [ "You cant give like or dislike to private pokemons" ] } ``` |
| GET | Get Likes | ```/api/v1/likes?limit=1&page=0``` |  Empty | ``` [ { "_id": "612385fba81062485a4016ec",  "pokemonId": "a2",  "userId": "pyX-ri6_h",  "__v": 0,  "active": false } ] ``` | ``` { errors: [ { "name": "TokenExpiredError", "message": "jwt expired", "expiredAt": "2021-08-23T07:16:32.000Z" } ] } ``` |

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

If you want to install or use manually, you will need import in mongodb the file called:
```sh
public_pokemons.json
```
