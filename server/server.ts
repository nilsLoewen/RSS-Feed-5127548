const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const textToSpeachV1 = require('ibm-watson/text-to-speech/v1')
const fileStream = require('fs')
const { IamAuthenticator} = require('ibm-watson/auth');
const IAMKEY = 'LKVNn3aHSo7rxu0upGkZO1ozK3L1OorXTuh7lYUOgtwq'
const CONFIGURL = ' https://stream.watsonplatform.net/text-to-speech/api'

/**
 * initialisiert einen TTS Handler der die IBM-Watson-Api nutzt
 * Es wird das IAM-Authentification verfahren genutzt. Der Token und die URL wurden in der Vorlesung bereitgestellt
 */
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

/**
 * Starte den Server auf Port 5200
 */
app.listen(5200,'127.0.0.1',function(){
  console.log('Server now listening on 5200');
})

/**
 * Schickt einen GET-Request um den RSS-Feed von der Tagesschau zu bekommen
 */
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

/**
 * Nutzt die Wikipedia-Api um nach dem Suchstring in req.params zu suchen und den entsprechenden Artikel zurückzuschicken
 */
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
      /**
       * Setzt Config-Parameter für die TTS Funktion
       * Als String wird der Extract des Wikipedia-Articels genutzt
       */
      const synthesizeParams = {
        text: body['extract'],
        accept: 'audio/wav',
        voice: 'de-DE_DieterVoice',
      };
      /**
       * Startet die TTS Funktion der IBM-Watson-Api und speichert das Ergebniss als wiki.wav im Assets Ordner
       */
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



