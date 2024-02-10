# Trip API Endpoints

Methods: __POST__, __GET__, __UPDATE__, __DELETE__

URL path: 
- api/trip 
- api/trip/{trip_id}

input:
```json
{
  "name": "string",
  "location": "string",
  "start_date": "2024-02-10",
  "end_date": "2024-02-10",
  "picture_url": "string"
}

```

output:
```json
{
  "name": "string",
  "location": "string",
  "start_date": "2024-02-10",
  "end_date": "2024-02-10",
  "picture_url": "string",
  "trip_id": 0
}

```

# Trip Buddies API Endpoints

Methods: __GET__, __POST__

URL path: 
- api/trip/{trip_id}/buddy
- api/trip/{trip_id}/role

input:
```json
{
  "user": "string",
  "buddy": true,
  "admin": false
}

```
output:
```json
{
  "user": "string",
  "buddy": true,
  "admin": false,
  "trip_id": 0
}

```
# Items
Methods: __POST__, __PUT__, __DELETE__  

Endpoints:
- /api/trip/{trip_id}/item
- /api/trip/{trip_id}/item/{item_id}

__input__:
```json
{
  "category_id": 5,
  "name": "string",
  "description": "string",
  "scheduled": false,
  "url": "string",
  "picture_url": "string",
  "cost": 0,
  "cost_per_person": true,
  "notes": "string"
}
```
__output__:
```json
{
  "category_id": 5,
  "name": "string",
  "description": "string",
  "scheduled": false,
  "url": "string",
  "picture_url": "string",
  "cost": 0,
  "cost_per_person": true,
  "notes": "string",
  "trip_id": 1,
  "item_id": 1
}
```

# Item Votes
Methods: __GET__, __POST__, __DELETE__

Endpoints:
- /api/item/{item_id}/vote
- /api/trip/{trip_id}/item/{item_id}/vote

__output__:
```json
{
  "votes": [
    0
  ]
}
```

Votes are added to a votes table with two columns, item_id and user_id. Both columns play the role of a primary, preventing duplicate 'votes' by the same user for the same item.

# Accounts
Methods: __GET__,__POST__, __PUT__, __DELETE__

Endpoints:
- /api/account

__input__:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "first_name": "string",
  "last_name": "string",
  "display_name": "string",
  "picture_url": "string"
}
```
__output__:
```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "username": "string",
    "email": "string",
    "user_id": 0
  }
}
```
A post to the Accounts endpoint will add a new row to the accounts table in the database with only two columns. Those Are username and email.

All other data will be a new row in the Users table


# Users
Methods: __GET__,__PUT__,__DELETE__

Endpoints:
- /api/user

__output__:
```json
{
  "phone": "string",
  "first_name": "string",
  "last_name": "string",
  "display_name": "string",
  "picture_url": "string",
  "user_id": 0
}
```

The user_id column in the users table is a foreign reference to the user_id in the accounts table that the user data is associated with

# Categories API Endpoints

## Method: GET
**Path: /api/trip/{trip_id}/category - Get all categories** 

**Input/Output:**
```json
[
    {
        "id": "1",
        "name": "Outdoors",
        "description": "All outdoor stuff."
    },
    {
        "id": "2",
        "name": "Indoors",
        "description": "All indoor stuff."
    }
]
```


  ## Method:POST 
  
  **Path: /api/trip/{trip_id}/category - Create Category**

  **Input/Output**

  ```json
  {
    "category_name": "string",
    "category_id": 1,
    "trip_id": 1
  }
```

## Method: GET 
**Path: /api/trip/{trip_id}/category/{category_id} - Get Items By Category**  

**Input/Output**

```json
{
  "items": [
    {
      "category_id": 1,
      "name": "string",
      "description": "string",
      "scheduled": false,
      "url": "string",
      "picture_url": "string",
      "cost": 0,
      "cost_per_person": true,
      "notes": "string",
      "trip_id": 1,
      "item_id": 1
    }
  ]
}
```

## Method:DELETE 
**Path:/api/trip/{trip_id}/category/{category_id} - Delete Category**  

**Input/Output**

```json
"string"
```