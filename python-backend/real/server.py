__author__ = "Colton Tshudy"
__version__ = "0.1"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program runs the application loop

import can_reader
from flask import Flask, Response, request
from flask_cors import CORS

### CANNER SETUP
canner = can_reader.Canner()
can_data_dict = dict()
### /CANNER SETUP

### FLASK SERVER
app = Flask(__name__)
CORS(app)

@app.route("/can_data")
def can_data():
    return can_data_dict

@app.route('/', methods=['POST'])
def get_data():
    print(f'Recieved from client: {request.json}')
    return Response('We recieved something…')

app.run(debug=True, threaded=True)