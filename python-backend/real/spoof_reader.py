__author__ = "Colton Tshudy"
__version__ = "0.2"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program returns spoof data for testing

### READ CONFIG
import configparser

config = configparser.RawConfigParser()
config.read('path_to_config.cfg file')
### /READ CONFIG

### BEGIN CLASS DEFINITION
class Canner:
    def __init__(self):
        self.config = dict(config.items('MOTOR_SETTINGS'))
        self.data = {
            'rpm': 25000,
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
            'mph': 25000/self.config['poles']*(self.config['mot_teeth']/self.config['rear_teeth']),
        }

    def scan(self):
        return True

    def getData(self):
        return self.data

    def add_to_ids(self, id):
        if id not in self.id_list:
            self.id_list.append(id)
            self.data['ids'] += f'{id} '

    def __str__(self):
        return str(self.data)
### END CLASS DEFINITION

### TEST FUNCTION
if __name__ == '__main__':
    import requests

    canner = Canner()
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


