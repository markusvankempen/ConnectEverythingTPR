/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Organization ID pv9rgd
Device Type watson
Device ID speech
Authentication Method token
Authentication Token VYDvks67KakWhcFGug
 */

'use strict';

var express = require('express'),
  app = express(),
  vcapServices = require('vcap_services'),
  extend = require('util')._extend,
  watson = require('watson-developer-cloud');
var expressBrowserify = require('express-browserify');

// load environment properties from a .env file for local development
require('dotenv').load({silent: true});

// Bootstrap application settings
require('./config/express')(app);


var mqtt = require('mqtt');

var mqttClient;
var mqttConfig = {
  deviceId : "speech",
  deviceType : "watson",
  apiToken : "VYDvks67KakWhcFGug",
  orgId : "pv9rgd",
  port : "1883"
};


app.get('/', function(req, res) {
  var clientId = ['d', mqttConfig.orgId, mqttConfig.deviceType, mqttConfig.deviceId].join(':');
  mqttClient = mqtt.connect("mqtt://" + mqttConfig.orgId + ".messaging.internetofthings.ibmcloud.com" + ":" + mqttConfig.port, {
    "clientId" : clientId,
    "keepalive" : 30,
    "username" : "use-token-auth",
    "password" : mqttConfig.apiToken
  });

  res.render('index', { ct: req._csrfToken });

 if (mqttClient) {
    mqttClient.publish('iot-2/evt/partial/fmt/json', JSON.stringify({
      "value" : "Starting Up"
    }), function () {
    }); 
 }
});


app.post('/mqtt', function(req, res, next) {
  console.log("MQTT: "+req.body.text)
  if (mqttClient) {
    mqttClient.publish('iot-2/evt/partial/fmt/json', JSON.stringify({
      "value" : req.body.text
    }), function () {
    }); 
  }
  res.send("ok");
  doit(JSON.stringify({"value" : req.body.text}));
});
       var ws;
       var wsUri  = "ws://iotgamenr.mybluemix.net/ws/simple";       
       console.log("WS url = "+wsUri);
            
        function wsConnect() {
            console.log("connect",wsUri);
            ws = new WebSocket(wsUri);
            //var line = "";    // either uncomment this for a building list of messages
            ws.onmessage = function(msg) {
                var line = "";  // or uncomment this to overwrite the existing message
                // parse the incoming message as a JSON object
                var data = msg.data;
                console.log("WS on message="+data);
                }
            ws.onopen = function() {
                // update the status div with the connection status
                document.getElementById('status').innerHTML = "connected";
                //ws.send("Open for data");
                console.log("ws connected");
            }
            ws.onclose = function() {
                // update the status div with the connection status
                document.getElementById('status').innerHTML = "not connected";
                // in case of lost connection tries to reconnect every 3 secs
                setTimeout(wsConnect,3000);
            }
        }
        
        function doit(m) {
            if (!ws) {
            			wsConnect();
            		}else{
          	  			ws.send(m);console.log("ws sending = "+m);
            	}
        }



// automatically compile and serve the front-end js
app.get('/js/index.js', expressBrowserify('src/index.js', {
  watch: process.env.NODE_ENV !== 'production'
}));

// For local development, replace username and password
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: process.env.STT_USERNAME || '<username>',
  password: process.env.STT_PASSWORD || '<password>'
}, vcapServices.getCredentials('speech_to_text'));

var authService = watson.authorization(config);

app.get('/', function(req, res) {
  res.render('index', {
    ct: req._csrfToken,
   // GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
  });
});

// Get token using your credentials
app.post('/api/token', function(req, res, next) {
  authService.getToken({url: config.url}, function(err, token) {
    if (err)
      next(err);
    else
      res.send(token);
  });
});

// error-handler settings
require('./config/error-handler')(app);

module.exports = app;
