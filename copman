#!/bin/bash

# init
COMPOSE_FILE="docker-compose.yml"

# main
if [[ $@ == "up" ]]; then
    echo "Start services in demon mode"
    docker-compose --file $COMPOSE_FILE up -d --build
elif [[ $@ == "down" ]]; then
    echo "Shut services down with removing build images"
    docker-compose --file $COMPOSE_FILE down
elif [[ $@ == "restart" ]]; then
    echo "restart services"
    ./copman down && ./copman up
elif [[ $@ == "list" ]]; then
    echo "list all services"
    docker-compose --file $COMPOSE_FILE ps
elif [[ $@ == "logs" ]]; then
    echo "list all logs"
    docker-compose --file $COMPOSE_FILE logs
elif [[ $@ == "remove" ]]; then
    echo "docker shut services down and remove build images"
    docker-compose --file $COMPOSE_FILE down --rmi all
else
    echo "No such command:" $@
    echo "It should be: up, down, logs, remove, stop"
fi