#!/bin/bash
aws lambda update-function-code \
--zip-file=fileb://code.zip \
--region=us-east-1 \
--function-name=SwingEventApi_hello
