#!/bin/bash

# Navigate to the React app directory
cd devops-group

# Start the application
npm start &
APP_PID=$!

# Wait for the application to start
sleep 10

# Run ZAP scan
docker run --rm -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable zap-baseline.py \
    -t http://host.docker.internal:3000 \
    -g gen.conf \
    -r zap-report.html

# Stop the application
kill $APP_PID

# Check if ZAP found any issues
if grep -q "FAIL-NEW: 0" zap-report.html; then
    echo "ZAP test passed"
    exit 0
else
    echo "ZAP test failed"
    exit 1
fi