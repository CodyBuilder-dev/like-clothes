#!/bin/bash
PORT=`netstat -tnlp 2>/dev/null | grep 8000 | awk '{print $7}' | sed 's/[^0-9]//g'`
#echo $PORT
kill -9 $PORT
