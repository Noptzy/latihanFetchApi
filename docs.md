# User API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. Get All Users
Get a list of all users with pagination and filtering.

```http
GET /users
```

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Number of items per page (default: 10)
- `offset` (optional) - Number of items to skip
- `name` (optional) - Filter by name
- `email` (optional) - Filter by email

**Response Success (200)**
```json
{
  "success": true,
  "message": "success get users",
  "data": {
    "data": [
      {
        "name": "string",
        "email": "string"
      }
    ],
    "total": "number",
    "page": "number",
    "limit": "number",
    "pageCount": "number",
    "hasNextPage": "boolean",
    "hasPrevPage": "boolean"
  }
}
```

### 2. Get Single User
Get details of a specific user by ID.

```http
GET /users/:id
```

**Response Success (200)**
```json
{
  "success": true,
  "message": "success get user",
  "data": {
    "name": "string",
    "email": "string"
  }
}
```

### 3. Create User
Create a new user.

```http
POST /users
```

**Request Body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**
- `name`: Required, min 3 chars, max 50 chars
- `email`: Required, valid email format
- `password`: Required, min 8 chars

**Response Success (201)**
```json
{
  "success": true,
  "message": "User Created",
  "data": {
    "name": "string",
    "email": "string"
  }
}
```

### 4. Update User
Update an existing user.

```http
PUT /users/:id
```

**Request Body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**
- `name`: Optional, min 3 chars, max 50 chars
- `email`: Optional, valid email format
- `password`: Optional, min 8 chars
- At least one field must be provided

**Response Success (200)**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "name": "string",
    "email": "string"
  }
}
```

### 5. Delete User
Delete a user by ID.

```http
DELETE /users/:id
```

**Response Success (200)**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error",
  "data": {
    "fieldName": "error message"
  }
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "User not found",
  "data": null
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "error",
  "data": null
}
```

## Notes
- All endpoints return JSON responses
- Authentication is not implemented in these endpoints
- All date-times are in ISO 8601 format
- The API uses MySQL as the database
- Passwords are hashed using bcrypt before storing