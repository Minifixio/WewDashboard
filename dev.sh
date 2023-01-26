#!/bin/bash

echo "Starting dev env..."
echo "WewDashboard - Setting the backend"
cd WewDashboardBackend
pm2 start dist/index.js --name WewDashboardDev
cd ..

echo "WewDashboard - Setting the client"
cd WewDashboardWeb
ng serve


