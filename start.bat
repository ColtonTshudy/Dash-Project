@ECHO off
start cmd /k py "%~dp0\python-backend\server.py"
start cmd /k py "%~dp0\python-backend\spoof_reader.py"
cd "%~dp0\dash-react"
call npm start
PAUSE