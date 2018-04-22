#!/bin/bash

NAME = $1
PORT = $2

echo "-------------------------------------------------"
echo "How to call: ./build.sh NAME PORT [install]"
echo "-------------------------------------------------"
cd /home/$NAME
if [ "$3" = "install" ]
then
  npm i
fi

source activate $NAME
PORT=$PORT npm run build
pm2 delete $NAME
PORT=$PORT pm2 start ./index.js --name "$NAME"
source deactivate