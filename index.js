#!/usr/bin/env node

var comicsFeed = require('comics-feed');
var express = require('express');

var app = express();
app.use(express.logger());

app.get('/env', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(JSON.stringify(process.env, null, 2));
});

app.get('/embed/:url', function(req, res) {
  var feedUrl = decodeURIComponent(req.params.url);
  console.log('Processing: ' + feedUrl);

  // only supports feed from HTTP server
  if(!/^https?:\/\//.test(feedUrl)) {
    return res.json(400, {
      message: "invalid url"
    });
  }

  comicsFeed.embedStrips(
    {
      url: feedUrl,
      verbose: true
    },
    function (err, feedXml) {
      if (err) {
        return res.json(500, {
          message: "error parsing: " + feedUrl
        });
      }
      res.setHeader('Content-Type', 'application/rss+xml');
      res.send(feedXml);
    }
  );
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
