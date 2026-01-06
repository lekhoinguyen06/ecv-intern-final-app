# ECV Intern Final Project Application
A simple application that allow user to update their profile.

## Table of content
- [Home](#ecv-intern-final-project-application)
- [Repository structure](#repository-structure)
- [API Guide](#api-guide)
- [Useful scripts](#useful-scripts)

## Resources
- [Git repository](https://github.com/lekhoinguyen06/ecv-intern-final-app)
- [Website URL](http://ecv-intern-alb-169112893.ap-southeast-1.elb.amazonaws.com/)
- [Postman workspace](https://ecv-intern.postman.co/workspace/ECV-Intern-Workspace~8b178da5-66b5-45d4-85db-cadf33166c79/collection/30708093-d35e6429-6b12-410e-b15f-760d6ae2a227?action=share&source=copy-link&creator=30708093)
- [Canva slide](https://www.canva.com/design/DAG7sKoOlFs/9s30LbNkf1zUp9ypFD_Jvw/edit?utm_content=DAG7sKoOlFs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [Drive folder](https://drive.google.com/drive/folders/1xRD948qS696USwBDj7_TQwkDaHn7tHun?usp=sharing)
- [UI designs](https://v0.app/chat/crm-saa-s-frontend-ui-cGyDA8Z190Z?ref=3RCX75)


## Repository structure
```text
ecv-intern-final app

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

## API guide

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

### Deployment 
To deploy on ec2

#### Start
For deployment on a new instance

First clone the project. Then, go to /backend and run:
```bash
bash ./run.sh
```
This will start an pm2 app by running the updateServer.sh script to that run a similar process to code update.

#### Update
To update code on a running instance

Sever will build both front end and back end before starting the app

```bash
pm2 restart ecv-intern-web-server
```

#### Local build
To build locally, go to root:
```bash
# To build all, commit and push
bash ./build.sh -a 

# To build backend, commit and push
bash ./build.sh -b -c -p -m "feat: new feature"

# For more guides on build script
bash ./build.sh -h
```