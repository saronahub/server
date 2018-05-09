# SaronaHub Server

## POST /register

body:
  - fbId(Optional) - String
  - email - String
  - phone - String
  - password - String
  - name - Object
  - name.first - String
  - name.last - String

returns `{ success: true }` or `{ success: false, error: 'Error Message' }`
