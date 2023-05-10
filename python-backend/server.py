__author__ = "Colton Tshudy"
__version__ = "0.1"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program runs the application loop

from flask import Flask, Response, request
from flask_cors import CORS
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
CORS(app)

can_data_dict = None


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


#app.run(debug=True, port=5001, threaded=True)
serve(app, host='0.0.0.0', port=5001)