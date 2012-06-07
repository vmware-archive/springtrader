#!/bin/bash

ps -ef | grep "rabbitmq" | grep -v grep | awk '{print $2}' | xargs kill -9

#ssh user@blah -i user.rsa `ps -ef | grep "rabbitmq" | grep -v grep | awk '{print $2}' | xargs kill -9`
