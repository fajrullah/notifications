# Birthday Greetings Schedule

A simple application to send a happy birthday message to users on their birthday at exactly 9 am on their local time. For example, if one user is in New York and the second user is in Melbourne, they should be getting a birthday message in their own time zone.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [API Usage](#api-usage)

## Introduction

Automatically send heartwarming birthday messages to users at exactly 9 am on their local time.

## Getting Started

Instructions on how to set up the project locally.

```bash
# Clone the repository
git clone https://github.com/fajrullah/notifications.git

# Navigate to the project directory
cd notifications

# Install dependencies
npm install

```

## API USAGE

To seamlessly integrate the Birthday Greetings Scheduler into your program, you can use the following cURL command

### Create User

To create a user, make a POST request to the `/users` endpoint with the following cURL command:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstName": "John",
    "lastName": "Doe",
    "birthday": "1990-01-01",
    "email": "testing@gmail.com",
    "location": {
        "city": "New York",
        "country": "USA",
        "timezone": "America/New_York"
    }
}' http://localhost:3000/users

```

### Get User Information

Retrieve user information by making a GET request to the `/users` endpoint.

```bash
curl --location 'localhost:3000/users'
```


### Delete User

Delete a user by making a DELETE request to the `/users/{userId}` endpoint.

```bash
curl --location --request DELETE 'localhost:3000/users/:userId'
```