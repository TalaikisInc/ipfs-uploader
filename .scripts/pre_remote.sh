#!/bin/bash

cd /opt && \
  git init --bare ipfs.git && \
  git clone ipfs.git ipfs

cp /root/.scripts/post-receive /opt/ipfs.git/hooks
chmod ug+x /opt/ipfs.git/hooks/post-receive
cp /root/.scripts/.env /opt/ipfs
