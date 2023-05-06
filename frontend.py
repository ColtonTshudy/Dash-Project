# Runs the frontend HTML built from react project

from flask import Flask, render_template
from flask_cors import CORS
from waitress import serve

# IMPORT THE HTML
import os
absolute_path = os.path.dirname(__file__)
relative_path = "dash-react/build/index.html"
html_path = os.path.join(absolute_path, relative_path)

# FLASK SERVER
app = Flask(__name__)
CORS(app)

@app.route("/")
def homepage():
    return render_template(html_path)

serve(app, host='0.0.0.0', port=8081)
