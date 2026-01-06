# ECV Intern Final Project Application

## Repository structure
```text
├── back-end
│   ├── client
│   ├── src
│   │   ├── dto
│   │   ├── filter
│   │   ├── intercept
│   │   ├── log
│   │   ├── pipe
│   │   ├── secret
│   │   ├── user
│   │   └── utils
│   └── test
└── front-end
    ├── app
    │   ├── home
    │   ├── profile
    │   ├── settings
    │   ├── signin
    │   └── signup
    ├── components
    │   └── ui
    ├── hooks
    ├── lib
    ├── public
    └── styles

```

## API guides

### Request body
Check email availability
```http
GET /api/user/check?email=<email>
```

Fetch user data
```http
GET /api/user?email=<email>
```

Create new user
```http
POST /api/user
```
```json
{
    "email": "example@gmail.com",
    "name": "Nguyen Van A",
    "age": 18,
    "sex": "Male",
    "description": "Something",
    "jobTitle": "Engineer",
    "studies": ["Highschool", "University"],
    "interests": ["Game", "Movie"],
    "notes": "Something",
}
```

Update user data
```http
PUT /api/user
```
```json
{
    "email": "example@gmail.com",
    "name": "Nguyen Van A",
    "age": 18,
    "sex": "Male",
    "description": "Something",
    "jobTitle": "Engineer",
    "studies": ["Highschool", "University"],
    "interests": ["Game", "Movie"],
    "notes": "Something",
}
```

Delete user
```http
DELETE /api/user?email=<email>
```

### Response format
Common response formats are
```json
{
    "status": "success",
    "statusCode": 200,
    "meta": {
        "apiVersion": "0.0.1"
    }
}
```

```json
{
    "status": "error",
    "statusCode": 404,
    "error": {
        "code": 404,
        "name": "NotFoundException",
        "message": "Cannot find user with email: john2.smith@example.com",
        "timestamp": "2026-01-05T05:46:32.661Z",
        "path": "/api/user?email=john2.smith@example.com"
    },
    "meta": {
        "apiVersion": "0.0.1"
    }
}
```

```json
{
    "status": "success",
    "statusCode": 200,
    "data": {
        "id": 832965,
        "email": "john2.smith@example.com",
        "name": "John Smith III",
        "age": 99,
        "sex": "Female",
        "description": "Backend developer with a passion for edge architecture",
        "jobTitle": "Software Engineer",
        "studies": [
            "Computer Science",
            "Cloud Computing"
        ],
        "interests": [
            "AWS",
            "NestJS",
            "Distributed Systems"
        ],
        "notes": "Interested in leadership roles"
    },
    "meta": {
        "apiVersion": "0.0.1"
    }
}
```

```json
{
    "status": "success",
    "statusCode": 200,
    "data": {
        "message": "This email is available",
        "isAvailable": true
    },
    "meta": {
        "apiVersion": "0.0.1"
    }
}
```

## Useful scripts

### To deploy on ec2

New: 

First clone the project. Then, go to /backend and run
```bash
bash ./run.sh
```

Update:<br>
Sever will build both front end and back end before starting the app
```bash
pm2 restart ecv-intern-web-server
```

To build locally, go to root:

To build all, commit and push
```bash
bash ./build.sh -a 
```

To build backend, commit and push:
```bash
bash ./build.sh -b -c -p -m "feat: new feature" 
```

For more guides on build script, run:
```bash
bash ./build.sh -h
```