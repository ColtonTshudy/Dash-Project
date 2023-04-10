@ECHO off
start cmd /k py "%~dp0\python-backend\server.py"
start cmd /k py "%~dp0\python-backend\spoof_reader.py"
Rem cd "%~dp0\dash-react"
Rem call npm start
Rem PAUSE