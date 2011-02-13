!#/usr/bin/env bash

echo 'killing node, nginx and mongod'
killall -15 node
killall -15 nginx
killall -15 mongod

echo 'restarting them all'
nginx
mongod &
node /home/www/apps/3dbash/app.js &

echo 'all has been started.'

echo 0
