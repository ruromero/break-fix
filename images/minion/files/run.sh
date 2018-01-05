#!/bin/sh
sed 's/_LEVEL_/'"$LEVEL"'/g' <index.template >html/index.html

cd html

python -m SimpleHTTPServer $SERVER_PORT
