__author__ = "Colton Tshudy"
__version__ = "0.2"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program returns spoof data for testing

import math
import time

# READ CONFIG
import os
import configparser as ConfigParser

absolute_path = os.path.dirname(__file__)
relative_path = "config.ini"
config_path = os.path.join(absolute_path, relative_path)

parser = ConfigParser.RawConfigParser()
parser.read(config_path)
# /READ CONFIG


class Canner:
    def __init__(self):
        self.config = dict(parser.items("MOTOR_SETTINGS"))
        for key in self.config:
            self.config[key] = int(self.config[key])
        self.data = {
            'erpm': 0,
            'rpm': 0,
            'motor_current': 0,
            'duty_cycle': 0,
            'ah_consumed': 0,
            'ah_regen': 0,
            'wh_consumed': 0,
            'wh_regen': 0,
            'mos_temp': 0,
            'mot_temp': 0,
            'battery_current': 0,
            'pid_position': 0,
            'tachometer': 0,
            'battery_voltage': 0,
            'ids': '',
            'mph': 0,
            'odometer': 0,
        }

    def scan(self, i):
        self.data = {
            "erpm": (i*100%40000)-10000,
            "rpm": ((i*100%40000)-10000)/self.config['mot_poles'],
            "motor_current": i%300-150,
            "duty_cycle": i/100%1,
            "ah_consumed": i/500%16,
            "ah_regen": i/2000%16,
            "wh_consumed": i/2%800,
            "wh_regen": i/50%800,
            "mos_temp": (i/5+30)%80,
            "mot_temp": (i/5+20)%80,
            "battery_current": i%80,
            "pid_position": i%50000,
            "tachometer": i%1000000/self.config['mot_poles'],
            "battery_voltage": (i/100+42)%58,
            "ids": "14 15 16 0 27",
            "mph": self._mph(((i*100%40000)-10000)/self.config['mot_poles']),
            "odometer": self._miles((i*100%1000000)/self.config['mot_poles']),
        }
        return True

    def getData(self):
        return self.data

    def add_to_ids(self, id):
        if id not in self.id_list:
            self.id_list.append(id)
            self.data["ids"] += f"{id} "

    def _mph(self, rpm):
        mph = self._miles(rpm)*60
        return mph
    
    def _miles(self, rotations):
        ratio = self.config["mot_teeth"]/self.config["rear_teeth"]  # gear ratio
        wheel_dia = self.config["rear_dia_in"]*math.pi # inch diameter of wheel
        miles = rotations*ratio*wheel_dia/63360 # total miles of rotations
        return miles

    def __str__(self):
        return str(self.data)


# TEST FUNCTION
if __name__ == "__main__":
    import requests

    canner = Canner()
    url = "http://127.0.0.1:5000"
    i = 0

    # MAIN LOOP
    while True:
        if canner.scan(i):
            can_data = canner.getData()
            query = {"field": can_data}
            try:
                req = requests.post(url, json=can_data)
                print(can_data)
            except requests.exceptions.RequestException:
                print('No server response')
        time.sleep(0.1)
        i+=2
