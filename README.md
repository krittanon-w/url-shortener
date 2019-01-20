# url-shortener

## Introduction
This project required `nodejs v10.15.0` and `mongodb` if you dont wanna install any software which are required, you can run `./run-on-docker.sh` at the **root directory** of project (I very recommend this way)

## How to start with Docker
I have created `./run-on-docker.sh` to run command for running this project on `Docker`. 
After starting this command you can access using [http://localhost:80](https:localhost:80).

## Reverse Proxy
The requests from localhost:80 will pass the Reverse Proxy according to this diagram.
```
                  +--- / ----> frontend container on internal link frontend:3000
                  |
users --> nginx --|--- /[0-9a-ZA-Z]+ ----> backend container on internal link backend:4000/api/original
                  |
                  +--- /api ----> backend container on internal link backend:4000
```

>`backend:4000/api/original/*` that return 404 status will redirect to `rootPath` e.g. http://localhost,  http://short.com

