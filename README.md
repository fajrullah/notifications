# Birthday Greetings Schedule

A simple application to send a happy birthday message to users on their birthday at exactly 9 am on their local time. For example, if one user is in New York and the second user is in Melbourne, they should be getting a birthday message in their own time zone.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [API Usage](#api-usage)
- [Contributing](#contributing)
- [License](#license)

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

```bash
   curl -X POST -H "Content-Type: application/json" -d '{
        "firstName": "John",
        "lastName": "Doe",
        "birthday": "1990-01-01",
        "location": {
            "city": "New York",
            "country": "USA",
            "timezone": "America/New_York"
        }
    }' http://localhost:3000/users

```

