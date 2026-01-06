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

## Useful scripts

### To deploy on ec2

New: first clone the project, go to /backend, run bash ./run.sh

Update:

pm2 restart ecv-intern-web-server 

Sever will build both front end and back end before starting the app

To build locally, go to root 

Build all, commit and push

bash ./build.sh -a 

Build backend, commit and push

bash ./build.sh -b -c -p -m "feat: new feature" 