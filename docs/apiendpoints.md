# Trip API Endpoints

Methods: __POST__, __GET__, __UPDATE__, __DELETE__

URL path: 
- api/trip 
- api/trip/{trip_id}

input:
```
{
  "name": "string",
  "location": "string",
  "start_date": "2024-02-10",
  "end_date": "2024-02-10",
  "picture_url": "string"
}

```

output:
```
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
```
{
  "user": "string",
  "buddy": true,
  "admin": false
}

```
output:
```
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
```
{
  "category_id": int,
  "name": string,
  "description": string,
  "scheduled": boolean,
  "url": string,
  "picture_url": string,
  "cost": int,
  "cost_per_person": boolean,
  "notes": string
}
```
__output__:
```
{
  "category_id": int,
  "name": string,
  "description": string,
  "scheduled": boolean,
  "url": string,
  "picture_url": string,
  "cost": int,
  "cost_per_person": boolean,
  "notes": string,
  "trip_id": int,
  "item_id": int
}
```

# Votes
Methods: __GET__, __POST__, __DELETE__

Endpoints:
- /api/item/{item_id}/vote
- /api/trip/{trip_id}/item/{item_id}/vote

__output__:
```
{
  "votes": [
    int
  ]
}
```

Votes are added to a votes table with two columns, item_id and user_id. Both columns play the role of a primary, preventing duplicate 'votes' by the same user for the same item.

# accounts
Methods: __GET__,__POST__, __PUT__, __DELETE__

Endpoints:
- /api/account

__input__:
```
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
```
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


# users
Methods: __GET__,__PUT__,__DELETE__

Endpoints:
- /api/user

__output__:
```
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
