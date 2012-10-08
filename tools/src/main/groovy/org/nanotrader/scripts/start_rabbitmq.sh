#!/bin/bash

#rabbitmqctl stop
rabbitmq-server -detached

#ssh user@blah -i user.rsa `rabbitmq-server -detached`
