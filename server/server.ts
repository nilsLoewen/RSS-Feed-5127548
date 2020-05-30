const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const textToSpeachV1 = require('ibm-watson/text-to-speech/v1')
const fileStream = require('fs')
const { IamAuthenticator} = require('ibm-watson/auth');
const IAMKEY = 'LKVNn3aHSo7rxu0upGkZO1ozK3L1OorXTuh7lYUOgtwq'
const CONFIGURL = ' https://stream.watsonplatform.net/text-to-speech/api'





const textToSpeach = new textToSpeachV1({
  authenticator: new IamAuthenticator({
    apikey: IAMKEY,
  }),
  url: CONFIGURL,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(5200,'127.0.0.1',function(){
  console.log('Server now listening on 5200');
})


app.get('/news', function (req, res) {
  console.log("Loading Rss Feed");
  var o = {
    uri: "http://www.tagesschau.de/xml/rss2",
    method: req.method,
    json: false,
  };
  request(o, function (error, response, body) {
    try {
      res.setHeader('Content-type', 'text/plain');
      //console.log(body);
      res.send(body);
    } catch (err) {
      res.setHeader('Content-type', 'text/plain');
      console.log("Fehler beim Transfer", err)
      res.send(err);
    } finally {
      return;
    }
  });
});




app.get('/wiki/:search', function (req, res) {
  console.log("Searching for ",req.params.search);
  var o = {
    uri: 'https://de.wikipedia.org/api/rest_v1/page/summary/' + req.params.search,
    method: req.method,
    json: true,
  };
  request(o, function (error, request, body) {
    try {
      res.setHeader('Content-type', 'text/plain');
      const synthesizeParams = {
        text: body['extract'],
        accept: 'audio/wav',
        voice: 'de-DE_DieterVoice',
      };
      textToSpeach.synthesize(synthesizeParams)
        .then(audio => {
          audio.result.pipe(fileStream.createWriteStream('../src/assets/wiki.wav'));
        })
        .catch(err => {
          console.log('error:', err);
        });
      res.send(body);
    } catch (error) {
      res.setHeader('Content-type', 'text/plain');
      console.log("Fehler beim Transfer", error)
      res.send(error);
    } finally {
      return
    }
  });
});


app.get('wiki/tts/:string',function(req,res){
  console.log('tts');
  const synthesizeParams = {
    text: req.params.string,
    accept: 'audio/wav',
    voice: 'de-DE_DieterVoice',
  };
  textToSpeach.synthesize(synthesizeParams, function (err, audio) {
    if (err) {
      console.log(err);
      return;
    }

    textToSpeach.repairWavHeader(audio);
    fileStream.writeFileSync('audio.wav', audio);
    console.log('audio.wav written with a corrected wav header');
  });
  res.send("test");
});



