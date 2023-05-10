(cd /home/tomos/Projects/Dash/Dash-Project/dash-react/build ;sudo -H -u tomos /bin/python -m http.server 5051) &
DISPLAY=:0 chromium-browser --kiosk http://localhost:5051