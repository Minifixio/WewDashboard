#!/bin/bash

echo "WewDashboard - Setting the backend"
cd WewDashboardBackend
npm install
pm2 start dist/index.js --name WewDashboard
cd ..

echo "WewDashboard - Setting the client"
cd WewDashboardWeb
npm install
http-server dist/WewDashboardWeb/



