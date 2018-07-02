# Overview

This describes the resources that make up the official SaronaHub REST API. If you have any problems or requests please open a issue.

1. [Current version](#current-version)
2. [Schema](#schema)
    1. [Root endpoint](#root-endpoint)
    2. [API versions](#api-versions)
3. [Authentication](#authentication)
4. [User](#user)
5. [Event](#event)

## Current version

We are currently on beta version. By default, all requests to `https://api.saronahub.co.il/beta` receive the beta version of the REST API.

## Schema

All API access is over HTTPS, and accessed from `api.saronahub.co.il`. All data is sent and received as JSON.

All timestamps return in ISO 8601 format:

```
YYYY-MM-DDTHH:MM:SSZ
```

### Root endpoint

The root endpoint of the server depends on the version you want to access. For example, the root endpoint of the **v1** version will be:

```
https://api.saronahub.co.il/v1
```

### API versions

This endpoint returns a list of all available API versions.

```
GET https://api.saronahub.co.il/versions
```

#### Response

```json
Status: 200 OK

{
  "success": true,
  "data": [
    "beta",
    "v1"
  ]
}
```

## Authentication

Requests that require authentication will return `403 Forbidden` when an invalid token was provided.

### Basic authentication

`curl -H "Authorization: token JWT-TOKEN" https://api.saronahub.co.il`

### Failed login

```
curl -H "Authorization: token JWT-TOKEN" https://api.saronahub.co.il
HTTP/1.1 401 Unauthorized
{
  "success": false,
  "error": "Bad credentials"
}
```

## User

### Create

```
POST /user
```

Create a new user

#### Input

| Name | Type | Description |
| ---- | ---- | ----------- |
| email | string | **Required**. A unique email address. |
| phone | string | **Required**. A valid Israeli phone number |
| fbId | string | User id for users registering with facebook |
| password | string | **Required**. Password length must be at least 8 characters |
| first_name | string | **Required**. First name length must be at least 1 character |
| last_name | string | **Required**. Last name length must be at least 1 character |

#### Example

```json
{
  "email": "johndoe@gmail.com",
  "phone": "0501234567",
  "password": "p@ssw0rd",
  "last_name": "John",
  "first_name": "Doe"
}
```

#### Response

```json
Status: 201 Created

{
  "success": true
}
```

### Login

```
POST /user/login
```

Authenticate user credentials and return JWT token

#### Input

| Name | Type | Description |
| ---- | ---- | ----------- |
| email | string | **Required**. A valid registered email address |
| password | string | **Required**. A valid matching password |

#### Example

```json
{
  "email": "johndoe@gmail.com",
  "password": "p@ssw0rd"
}
```

#### Response

```json
Status: 200 OK

{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.anVzdCBmb3IgdGhlIGV4YW1wbGUgOik.V178zZzPlbCbvBfvmJTGIx9vTfyPNxTYaxiHVg3ebPU"
  }
}
```

## Event

| Room name | Room number |
| -------- | --------- |
| Open space | 1 |
| Aquarium | 2 |
| Ventures room | 3 |

### List all public events

```
GET /event
```

List all public and approved events by room bumber.
Returned events are future or ongoing events.

#### Response

```json
Status: 200 OK

{
  "success": true,
  "data": {
    "1": [
      {
        "author": {
          "id": "5af1de8a7145b9740766744b",
          "name": "John Doe"
        },
        "image": "https://devimages-cdn.apple.com/wwdc/images/endframe-landscape.jpg",
        "participants": [
          "5af1de8a7145b9740766744b"
        ],
        "age_limit": {
          "min": 16
        },
        "name": "WWDC Livestream",
        "description": "first event!",
        "end_date": "2018-05-24T16:24:09.618Z",
        "start_date": "2018-05-24T16:07:29.618Z",
        "id": "5b0724c43ae02b8486f3b5af"
      }
    ],
    "2": [],
    "3": []
  }
}
```
