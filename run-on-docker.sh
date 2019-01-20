#!/bin/bash

cd backend
docker build -t surl_backend .
cd ..

cd frontend
docker build -t surl_frontend .
cd ..

./copman.sh down
./copman.sh up