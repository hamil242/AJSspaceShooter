'use strict';

var dotenv = require('dotenv');
dotenv.load();

var async = require('async'),
Cloudant = require('cloudant'),
cloudant = Cloudant({url: process.env.CLOUDANT_URL}),
db = cloudant.db.use(process.env.CLOUDANT_DB);

var url = require('url');

var app = require('../server');

// read a document from database
var readDocument = function(callback) {

  db.get(process.env.CLOUDANT_DOC, function(err, data) {
    var doc = data;

    app.use(function(request, response, next) {
      //response.setHeader("Access-Control-Allow-Origin", "*");
      var path = url.parse(request.url).pathname

      if (path === '/highScore') {
        console.log("Getting High Score...");

        var findHighScore = data.players;

        var highScore = 0;
        var highScoreIndex = 0;
        for (var i=0; i < findHighScore.length; i++) {
          if(findHighScore[i].score > highScore){
            highScore = findHighScore[i].score;
            highScoreIndex = i;
          }
        }
        console.log(highScore);
        var json = JSON.stringify(findHighScore[highScoreIndex]);
        response.write(json);

      } else if (path === '/sendScore') {

        console.log("Add new Score...");
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        query.score = parseInt(query.score);
        console.log(query);
        console.log("Updating document players");
        // make a change to the document, using the copy we kept from reading it back
        doc.players.push(query);
        db.insert(doc, function(err, data) {
          console.log("Error:", err);
          console.log("Data:", data);
          // keep the revision of the update so we can delete it
          doc._rev = data.rev;
        });
      } else {
        response.statusCode = 400
        response.write('Could not process your request at this time.')
      }
        response.end()
        return next();
      });
    callback(err, data);
  });
};

async.series([readDocument]);
