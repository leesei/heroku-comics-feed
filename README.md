Heroku app: comics-feed
==================

A sample Heroku application that embed the comic strip images to a given feed.

## Usage

```bash
git clone https://github.com/leesei/heroku-comics-feed.git
heroku apps:create NAME
git push heroku master
```

Then visit `http:/_NAME_.herokuapp.com/embed/_URL_`, where:  
_NAME_ is the Heroku app name you specified  
_URL_ is the URL of the feed you want to embed comics strip in

Check [node-comics-feed](https://github.com/leesei/node-comics-feed) for supported feeds.

## Tested on

http://localhost:5000/embed/http%3A%2F%2Ffeeds.dilbert.com%2FDilbertDailyStrip  
http://localhost:5000/embed/http%3A%2F%2Ffeeds.feedburner.com%2Fuclick%2Fdilbert-classics

Use `foreman start` to start server locally.
