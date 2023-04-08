from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Members API Route
@app.route("/can_data")

def can_data():
    return {'rpm': 8000, 'battery_current': 80}

if __name__ == "__main__":
    app.run(debug=True)