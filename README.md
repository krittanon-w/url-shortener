# url-shortener

## Introduction
This project required `nodejs v10.15.0` and `mongodb` if you dont wanna install any software which are required, you can run `./run-on-docker.sh` at the **root directory** of project (I very recommend this way).

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

## From your requirements 
- ✅ 1. Accept any URL as input. (eg. https://www.google.com/intl/en/policies/privacy/ )
- ✅ 2. Produce a secure short output URL. (eg. https://shrt.com/h3Zk32p )
- ✅ 3. When users visit the output URL, they should be redirected to the original URL.
- ✅ 4. Bonus: Accept a requested URL as input. (eg. "goog" to get https://short.url/goog )

> the 4th requirement, input must create by 0-9, a-z or A-Z

## Security issue
- You can send request with json body directly to backend and in the backend, it has no field validation. when you send the request with missing some field it will make frontend crash. so that, prevent this issue just add field validation.
- In the field of api `originalUrl` and `aliasUrl`, they have no regex checking so you can send a request to api and it will work correctly. but when you request via the reverse proxy you will get 404 error and auto redirect to first page. adding the regex in url router and json body input in backend can fix this issue.
- For the docker networking between backend and database, you can access database directly so you have to use internal ip address for connectivity between backend and database. It make database can not access from external directly.

## Scalability issue
- The default of this project, the database did not do **indexing**. so if you want it is faster you can do indexing.
- When you do a **database sharding**, you have to find a new url encode. Because in this project I have encoded the mongodb ObjectId that is hex string to base 62 string and cut a process id, machine number, and counter. so in mongodb sharding, when you decode mongodb id it possible to generate same shortUrl and your short url will be not unique. To prevent this you can create auto increment id and then, encode it but I think not is the proper way. so the another proper way is, use same encoding but the short url will be longer about 4-5 characters.
- In the Docker env that I have created in this project, the frontend it should generate **static file** then serve on Nginx and do load balance or static cache. *in the frontend dockerfile I serve it via hot reload webserver. Because create the script to auto generate static then run on docker will take more time.

## Developer Information
- name: Krittanon Wisedchart
- email: krittanon.w@gmail.com
- phone-no: Thailand +668-394-7751, 086-394-7751
- GitHub: [github.com/krittanon-w](https://github.com/krittanon-w)
- LinkIn: [linkedin.com/in/krittanon-w](https://linkedin.com/in/krittanon-w)