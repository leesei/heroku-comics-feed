Heroku app: comics-feed
==================

A sample Heroku application that embeds the comic strip images to a given feed.

## Usage

```bash
git clone https://github.com/leesei/heroku-comics-feed.git
heroku apps:create NAME
git push heroku master
```

Then visit `http:/_NAME_.herokuapp.com/embed/_URL_`, where:

- _NAME_ is the Heroku app name you specified  
- _URL_ is the [`encodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)-encoded URL of the feed you want to embed comic strips in.

Index page `http:/_NAME_.herokuapp.com/` helps to URI-encode feed url.

Check [node-comics-feed](https://github.com/leesei/node-comics-feed) for supported sites.

## Tested on

- http://localhost:5000/embed/http%3A%2F%2Ffeed.dilbert.com%2Fdilbert%2Fdaily_strip  
- http://localhost:5000/embed/http%3A%2F%2Ffeeds.feedburner.com%2Fuclick%2Fdilbert-classics
- http://localhost:5000/embed/http%3A%2F%2Ffeeds.feedburner.com%2FExplosm

To local host the application:

```bash
git clone https://github.com/leesei/heroku-comics-feed.git
npm install
node index.js
# or
foreman start
```

