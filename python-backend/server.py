__author__ = "Colton Tshudy"
__version__ = "0.1"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program runs the application loop

from flask import Flask, Response, request
from flask_cors import CORS

# FLASK SERVER
app = Flask(__name__)
CORS(app)


@app.route("/can_data")
def can_data():
    global can_data_dict
    return can_data_dict


@app.route('/', methods=['POST'])
def get_data():
    global can_data_dict
    can_data_dict = request.json
    print(f'Recieved from client: {can_data_dict}')
    return Response('success')


app.run(debug=True, threaded=True)
