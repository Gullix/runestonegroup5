##arduino

###usage

####Arduino
connect like image
led 12 light when data sending.
button: to turn on / off send data.
led 13 bluetooth state
#####Arduino connect
```
bluetooth: 5v , grd, tx=10, rx=11
button turn on/off:  5v, grd, 10k ohm, pin = 2
led sensor: grd, 200ohm, pin = 13
led bluetooth send: grd, 220ohm, pin = 12
lcd : pin = 987654
```

send to server
example:
###
send temperature and humidity of 6 storage to server as
TEMP1 60 HU1 5 TEMP2 65 HU2 6 TEMP3 65 HU3 6 TEMP4 65 HU4 6  TEMP5 65 HU5 6  TEMP6 65 HU6 6  
###

####server Python
install blueman: sudo apt-get install blueman
setup serial port by blueman
get port of arduino bluetooth device
example : /dev/comm0
run: sudo python3 bluetooth.py

press button on arduino to start sensor