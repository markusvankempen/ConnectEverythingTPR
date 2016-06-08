# ConnectEverythingTPR
Place Holder for Toilet Paper Roll IoT Demo Code

#mvk@ca.ibm.com
Hi Guys

For conference I wanted to show some "unusual" connected to Watson IoT Platform.

YouTube:
Connect everything like a TPR to IoT
https://www.youtube.com/watch?v=2g79bANPTd0
How to use IoT data with  Watson SpeechToText, TextToSpeech and NLC to query Sensors
https://youtu.be/R8334oNFplA

So I looked around the Apartment and thought maybe coffee machine, Wine Bottle or the Refrigerator but than
I found the Toilet paper roll more interesting and challenging to connect to IoT.
My idea was to measure the paper level, the flow and maybe more parameters.
So I found a old Toilet paper stand in the basement and started envision the setup and scenario. Below my setup

image






















I went thru a lot of different types of sensor but ended up using IR emitter / detector pair and a piezo element to detect

movement/activity .. i know there are probably others options ( please let me (us) know  if you have some ideas/experience

with different sensors) I found giving the space and time i had to work with this was the simplest. As a controller is settle on

the bluelightbean ... it ble and very energy efficient and you can use Arduino development environment.

I took a while to calibrate the sensor ... especially lining up the emitter and detector  (thanks to a clue gun and lots of tape

these things can be adjusted ;)) Once i figured the thresholds of the sensors. Like Analog values for the IR Detector with

my 220Ohm resistor was 10-50 ... where 10-20 meant be beam is connected to the Detector and 25+ meant its blocked ...

which meant for my scenario the TPR (Toilet Paper Roll) level a Good. For the piezo sensor pretty much

anything other than zero meant movement or activity e.g somebody using the TPR.
>>> TPR ROOL MOVING
>>> TPR Paper LOW
A1 = 0
A0 = 25

I connected the ble bean via my computer (could be pi as well ) to send mqtt message toe Watson IoT Platform.

Here my little node.js mqtt client sending the data to WIoTP.

image

























Once I got the message coming into IoT i used  Node-RED to orchestrate them a little e.g to send sms,email notification and

passed the data to freeboard. I created than a little  a dashboard which looks at the moment like this:

image


























Let me know if you you have questions... Thoughts other ideas or comments..


Cheers

Markus

Here a draft video:

https://www.dropbox.com/s/x3c8p1p26uftofs/TPR-IOT.mov?dl=0


PS: I am planing to add Text to Speech and Speed to Text as well as NLC ... lets see if we get some "AI" and prediction add to the scenario

- just imagine :)

Here my humble starts:

https://youtu.be/R8334oNFplA




