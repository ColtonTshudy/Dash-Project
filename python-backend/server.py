__author__ = "Colton Tshudy"
__version__ = "0.1"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program runs the application loop

from flask import Flask, Response, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from waitress import serve

# CONFIG DATA
import os
import configparser as ConfigParser

absolute_path = os.path.dirname(__file__)
relative_path = "config.ini"
config_path = os.path.join(absolute_path, relative_path)

parser = ConfigParser.RawConfigParser()
parser.read(config_path)

config_dict = dict()
for section in parser.sections():
    config_dict[section] = dict()
    for (key, value) in parser.items(section):
        config_dict[section][key] = value

# FLASK SERVER
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
CORS(app, resources={r"/*": {"origins": "*"}})
socket = SocketIO(app, cors_allowed_origins="*")


can_data_dict = None

### HTML REQUESTS
@app.route("/can_data")
def can_data():
    global can_data_dict
    return can_data_dict

@app.route("/config_data")
def config():
    global config_dict
    return config_dict

@app.route('/', methods=['POST'])
def get_data():
    global can_data_dict
    can_data_dict = request.json
    # print(f'Recieved from client: {can_data_dict}')
    return Response('success')

### WEBSOCKET
@socket.on("connect")
def connected():
    # print(request.sid)
    # print('client has connected')
    emit("connect", {'data': f'id: {request.sid} is connected'})


@socket.on('get_data')
def send_data():
    global can_data_dict
    emit('data', can_data_dict, broadcast=True)


@socket.on('disconnect')
def disconnected():
    # print("user disconnected")
    emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


#app.run(debug=True, port=5001, threaded=True)
socket.run(app, port=5001)
