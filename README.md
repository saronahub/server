# Overview

This describes the resources that make up the official SaronaHub REST API. If you have any problems or requests please open a issue.

1. [Current version](#current-version)
2. [Schema](#schema)
    1. [Root endpoint](#root-endpoint)
3. [Authentication](#authentication)

## Current version

We are currently on alpha version. By default, all requests to `(URL will be added soon)` receive the alpha version of the REST API.

## Schema

All API access is over HTTPS, and accessed from `(URL will be added soon)`. All data is sent and received as JSON.

All timestamps return in ISO 8601 format:

```
YYYY-MM-DDTHH:MM:SSZ
```

### Root endpoint

The root endpoint of the server depends on the version you want to access. For example, the root endpoint of the **v1** version will be:

```
https://(URL will be added soon)/v1
```

## Authentication

Requests that require authentication will return `403 Forbidden`.

### Basic authentication

`curl -H "Authorization: token JWT-TOKEN" (URL will be added soon)`

### Failed login

```
curl -H "Authorization: token JWT-TOKEN" (URL will be added soon)
HTTP/1.1 401 Unauthorized
{
  "success": false,
  "error": "Bad credentials"
}
```
