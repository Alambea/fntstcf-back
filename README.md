# RESTful API Documentation

This document provides information about the RESTful API for managing users.
https://fntstcf-ana-lambea.onrender.com

## Table of Contents

- Endpoints
  - GET /users
  - PUT /users
  - POST /sync
- Usage
- Error Handling
- Sample Requests and Responses

## Endpoints

## GET /users

Retrieve a list of all users.

#### Request:

```http
GET /users
```

#### Response:

🟢

```json
Status: 200 OK
Content-Type: application/json

{
  users:[
    {
      "_id": "65a041fd3be6e3fa7522f208",
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "externalId": "1",
      "address": "Gwenborough Kulas Light, Apt. 556, 92998-3874",
    },
    {
      "_id": "65a041fd3be6e3fa7522f20b",
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "externalId": "2",
      "address": "Wisokyburgh Victor Plains, Suite 879, 90566-7771",
    },
  // ... more users
  ]
}
```

🔴

```json
Status: 404
{message: "Failed to get users"}
```

### PUT /users

Create new user.

#### Request:

```http
PUT /user
Content-Type: application/json

{
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "externalId": "2",
  "address": "Wisokyburgh Victor Plains, Suite 879, 90566-7771",
},
```

#### Response:

🟢

```json
Status: 201 Created
Content-Type: application/json

{
  user:
    {
    "_id": "65a041fd3be6e3fa7522f20b",
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "externalId": "2",
    "address": "Wisokyburgh Victor Plains, Suite 879, 90566-7771",
  },
}
```

🔴

```json
Status: 404
{message: "Failed to add user"}
```

### POST /sync

Sync to the API https://jsonplaceholder.typicode.com/users and add/modify the users in the internal database.

#### Request:

```http
POST /sync
```

#### Response:

🟢

```json
Status: 201 Created
Content-Type: application/json

{
  users:[
    {
      "_id": "65a041fd3be6e3fa7522f208",
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "externalId": "1",
      "address": "Gwenborough Kulas Light, Apt. 556, 92998-3874",
    },
    {
      "_id": "65a041fd3be6e3fa7522f20b",
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "externalId": "2",
      "address": "Wisokyburgh Victor Plains, Suite 879, 90566-7771",
    },
  // ... more users
  ]
}
```

🔴

```json
Status: 500
{message: "Error on synchronize users"}
```

## Usage

To use this API, make HTTP requests to the specified endpoints using appropriate HTTP methods (GET, PUT, POST) as described above.

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of errors. Refer to each endpoint's documentation for details on possible error responses.

## Sample Requests and Responses

You can find sample HTTP requests and responses in the documentation for each endpoint above.

## MongoDB and Express.js Stack

MongoDB as a NoSQL database, storing the data in a document-based format.
Express.js as a framework for node.js to organize routers, middlewares, https methods and integrate the database system with MongoDB.

## Testing

In this API i used Jest for unit testing and Supertest for integration endpoint testing.
Here some Sonar metrics:

![Back coverage](https://media.discordapp.net/attachments/1145135177534812231/1156606037093261442/Captura_de_pantalla_2023-09-27_162411.png)
![Back coverage](https://media.discordapp.net/attachments/1145135177534812231/1156606037391065201/Captura_de_pantalla_2023-09-27_162424.png)

Scripts to run tests:

- npm run test
- npm run test:coverage
