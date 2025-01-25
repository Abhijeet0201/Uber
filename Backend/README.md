# User Registration Endpoint

## Endpoint
`POST /user/register`
 
## Description
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns an authentication token along with the user data.

## Request Body
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, optional, minimum 3 characters)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success (201)
- **Description**: User registered successfully.
- **Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Client Error (400)
- **Description**: Invalid input data or email already in use.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

### Server Error (500)
- **Description**: Server error, please try again later.
- **Body**:
  ```json
  {
    "error": "Server error, please try again later"
  }
  ```


