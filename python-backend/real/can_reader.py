__author__ = "Colton Tshudy"
__version__ = "0.1"
__email__ = "coltont@vt.edu"
__status__ = "Prototyping"

# This program talks to the hardware

from can import Bus

# BEGIN CLASS DEFINITION
class Canner:
    def __init__(self):
        self.bus = Bus(interface='socketcan', channel='can0', bitrate=1000000)
        self.msg = None
        self.msg_type = None
        self.id_list = []
        self.data = {
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
        }

    def scan(self):
        message = self.bus.recv(0.0)  # non-blocking read

        if message is None:
            return False

        self.msg = message
        self.extractFrame()
        return True

    # Find the status message type from arbitration id
    def extractFrame(self):
        status = self.msg.arbitration_id >> 8
        self.add_to_ids(status)
        buf = self.msg.data

        try:
            if status == 9: # Current and misc
                self.data['rpm'] = (buf[0]<<24) + (buf[1]<<16) + (buf[2]<<8) + buf[3]
                self.data['motor_current'] = ((buf[4]<<8) + buf[5])/10
                self.data['duty_cycle'] = ((buf[6]<<8) + buf[7])/1000
            elif status == 14: # Amp hour stats
                self.data['ah_consumed'] = ((buf[0]<<24) + (buf[1]<<16) + (buf[2]<<8) + buf[3])/10000
                self.data['ah_regen'] = ((buf[4]<<24) + (buf[5]<<16) + (buf[6]<<8) + buf[7])/10000
            elif status == 15: # Watt hour stats
                self.data['wh_consumed'] = ((buf[0]<<24) + (buf[1]<<16) + (buf[2]<<8) + buf[3])/10000
                self.data['wh_regen'] = ((buf[4]<<24) + (buf[5]<<16) + (buf[6]<<8) + buf[7])/10000
            elif status == 16: # Temperature and misc
                self.data['mos_temp'] = ((buf[0]<<8) + buf[1])/10
                self.data['mot_temp'] = ((buf[2]<<8) + buf[3])/10
                self.data['battery_current'] = ((buf[4]<<8) + buf[5])/10
                self.data['pid_position'] = ((buf[6]<<8) + buf[7])
            elif status == 27: # Tachometer and battery voltage
                self.data['tachometer'] = ((buf[0]<<24) + (buf[1]<<16) + (buf[2]<<8) + buf[3])
                self.data['battery_voltage'] = ((buf[4]<<8) + buf[5])/10 
        except:
            print("data aquisition error")

    def getData(self):
        return self.data

    def add_to_ids(self, id):
        if id not in self.id_list:
            self.id_list.append(id)
            self.data['ids']+=f'{id} '

    def __str__(self):
        return str(self.data)