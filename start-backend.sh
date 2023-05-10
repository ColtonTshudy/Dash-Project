sudo -H -u tomos /bin/python /home/tomos/Projects/Dash/Dash-Project/python-backend/main.py &
sudo -H -u tomos /bin/python /home/tomos/Projects/Dash/Dash-Project/python-backend/server.py &
(cd /home/tomos/Projects/Dash/Dash-Project/dash-react/build ;sudo -H -u tomos /bin/python -m http.server 5051) &

exit 0