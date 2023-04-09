__author__ = "Colton Tshudy"
__version__ = "0.1"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program runs the application loop

import can_reader
import requests

canner = can_reader.Canner()
url = 'http://127.0.0.1:5000'

### MAIN LOOP
try:
    while True:
        if canner.scan():
            can_data = canner.getData()
            print(str(can_data))
            query = {'field': can_data}
            try:
                req = requests.post(url, json=can_data)
            except:
                pass

except KeyboardInterrupt:
    pass
