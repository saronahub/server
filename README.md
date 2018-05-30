# Overview

This describes the resources that make up the official SaronaHub REST API. If you have any problems or requests please open a issue.

1. [Current version](#current-version)
2. [Authentication](#authentication)

## Current version

We are currently on alpha version. By default, all requests to `(URL will be added soon)` receive the alpha version of the REST API.

All API access is over HTTPS, and accessed from `(URL will be added soon)`. All data is sent and received as JSON.

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
