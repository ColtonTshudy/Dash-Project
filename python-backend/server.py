__author__ = "Colton Tshudy"
__version__ = "0.1"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program runs the application loop

from flask import Flask, Response, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

# FLASK SERVER
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
CORS(app, resources={r"/*": {"origins": "*"}})
socket = SocketIO(app, cors_allowed_origins="*")


@app.route("/can_data")
def can_data():
    global can_data_dict
    return can_data_dict


@app.route('/', methods=['POST'])
def store_data():
    global can_data_dict
    can_data_dict = request.json
    print(f'Recieved from client: {can_data_dict}')
    return Response('success')


@socket.on("connect")
def connected():
    print(f'client {request.sid} has connected')
    emit("connect", {'data': f'id: {request.sid} is connected'})


@socket.on('get_data')
def send_data():
    global can_data_dict
    emit('data', can_data_dict, broadcast=True)


@socket.on('disconnect')
def disconnected():
    print("user disconnected")
    emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


if __name__ == '__main__':
    socket.run(app, debug=True, port=5001)
