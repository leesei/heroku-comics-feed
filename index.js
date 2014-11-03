#!/usr/bin/env node

var comicsFeed = require('comics-feed');
var express = require('express');
var fs = require('fs');

var app = express();
app.use(express.logger());

app.get('/env', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(JSON.stringify(process.env, null, 2));
});

// cache the index file upon load
var index = fs.readFileSync('index.html', 'utf-8');
app.get('/', function(req, res) {
  res.send(index);
});

// The routing here is /embed/<ORIGINAL RSS URL> where the URL can be encoded e.g.
// http%3A%2F%2Ffeed.dilbert.com%2Fdilbert%2Fdaily_strip
// or without % encoding:
// http://feed.dilbert.com/dilbert/daily_strip
app.get(/^\/embed\/(.*)$/, function(req, res) {
  var rawUrl = req.params[0];
  var feedUrl = decodeURIComponent(rawUrl);
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
          message: "error parsing: " + feedUrl,
          error: err.toString()
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
