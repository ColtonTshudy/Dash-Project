__author__ = "Colton Tshudy"
__version__ = "0.1"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program runs the application loop

import can_reader
from flask import Flask
from flask_cors import CORS

### CANNER SETUP
canner = can_reader.Canner()
can_data_dict = dict()
### /CANNER SETUP

### FLASK SETUP
app = Flask(__name__)
CORS(app)

@app.route("/can_data")

def can_data():
    return can_data_dict
### /FLASK SETUP

### MAIN LOOP
try:
    while True:
        if canner.scan():
            can_data_dict = canner.getData()
except KeyboardInterrupt:
    pass