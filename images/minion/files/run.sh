#!/bin/sh
sed 's/_LEVEL_/'"$LEVEL"'/g' <index.template >html/index.json

cd html

python -m SimpleHTTPServer $SERVER_PORT
