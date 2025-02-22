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

# User Login Endpoint

## Endpoint
`POST /user/login`

## Description
This endpoint is used to authenticate a user. It validates the input data, checks the user's credentials, and returns an authentication token along with the user data.

## Request Body
The request body should be a JSON object containing the following fields:

- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)



## Responses

### Success (200)
- **Description**: User authenticated successfully.
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
- **Description**: Invalid input data.
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

### Client Error (401)
- **Description**: Invalid email or password.
- **Body**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

# User Profile Endpoint

## Endpoint
`GET /user/profile`

## Description
This endpoint is used to retrieve the authenticated user's profile data.

## Responses

### Success (200)
- **Description**: User profile retrieved successfully.
- **Body**:
  ```json
  {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
  ```

### Client Error (401)
- **Description**: Unauthorized access.
- **Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

# User Logout Endpoint

## Endpoint
`GET /user/logout`

## Description
This endpoint is used to log out the authenticated user by clearing the authentication token.

## Responses

### Success (200)
- **Description**: User logged out successfully.
- **Body**:
  ```json
  {
    "message": "Logged out"
  }
  ```

### Client Error (401)
- **Description**: Unauthorized access.
- **Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```
  
# Captain Registration Endpoint

## Endpoint
`POST /captains/register`

## Description
This endpoint is used to register a new captain. It validates the input data, hashes the password, creates a new captain in the database, and returns an authentication token along with the captain data.

## Request Body
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, optional, minimum 3 characters)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)
- `vehicle`: An object containing:
  - `color` (string, required, minimum 3 characters)
  - `plate` (string, required, minimum 3 characters)
  - `capacity` (number, required, minimum 1)
  - `vehicleType` (string, required, must be one of `car`, `motorcycle`, `auto`)


## Responses

### Success (201)
- **Description**: Captain registered successfully.
- **Body**:
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "BR XY 1998",
        "capacity": 3,
        "vehicleType": "car"
      }
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

# Captain Login Endpoint

## Endpoint
`POST /captains/login`

## Description
This endpoint is used to authenticate a captain. It validates the input data, checks the captain's credentials, and returns an authentication token along with the captain data.

## Request Body
The request body should be a JSON object containing the following fields:

- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)

## Responses

### Success (200)
- **Description**: Captain authenticated successfully.
- **Body**:
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "BR XY 1998",
        "capacity": 3,
        "vehicleType": "car"
      }
    }
  }
  ```

### Client Error (400)
- **Description**: Invalid input data.
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

### Client Error (401)
- **Description**: Invalid email or password.
- **Body**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

# Captain Profile Endpoint

## Endpoint
`GET /captains/profile`

## Description
This endpoint is used to retrieve the authenticated captain's profile data.

## Responses

### Success (200)
- **Description**: Captain profile retrieved successfully.
- **Body**:
  ```json
  {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "BR XY 1998",
      "capacity": 3,
      "vehicleType": "car"
    }
  }
  ```

### Client Error (401)
- **Description**: Unauthorized access.
- **Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

# Captain Logout Endpoint

## Endpoint
`GET /captains/logout`

## Description
This endpoint is used to log out the authenticated captain by clearing the authentication token.

## Responses

### Success (200)
- **Description**: Captain logged out successfully.
- **Body**:
  ```json
  {
    "message": "Logged out"
  }
  ```

### Client Error (401)
- **Description**: Unauthorized access.
- **Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```




