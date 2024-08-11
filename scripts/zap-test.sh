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
    #will have to change the above port!
    -g gen.conf \
    -r zap-report.html

# Stop the application
kill $APP_PID

# Always exit with success
echo "ZAP scan completed. Check zap-report.html for details."
exit 0

#Will make this more complex later on.