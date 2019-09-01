#!/bin/bash

APP=ipfs
PORT=3004

./slave_build.sh "$APP"
docker stop "$APP"
docker rm "$APP"
./slave_start.sh "$APP" "$PORT"
