'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _youtubeDl = require('youtube-dl');

var _youtubeDl2 = _interopRequireDefault(_youtubeDl);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

/** CONFIG **/
var port = process.env.PORT || 4000;

var requestCache = function requestCache(duration) {
  return function (req, res, next) {
    var key = '__express__' + req.originalUrl || req.url;
    var cachedBody = _memoryCache2.default.get(key);
    if (cachedBody) {
      res.send(cachedBody);
    } else {
      res.sendResponse = res.send;
      res.send = function (body) {
        _memoryCache2.default.put(key, body, duration);
        res.sendResponse(body);
      };
      next();
    }
  };
};

/** ROUTES **/
/* home */
app.get('/', function (req, res) {
  var text = '<h1>OpenLoad.CO API project</h1><p>This is just a scraper, if you have content you wish to be removed, please contact them (openload.co), not me, at their email: <a href="mailto:dmca@openload.co">dmca@openload.co</a>.</p><p>Full source code available on Github: <a href="https://www.github.com/milankragujevic/openload-api/" target="_blank">openload-api.git</a>. </p><hr><p>Copyright &copy; 2018 Milan Kragujević. Some rights reserved. By using this API you may be committing copyright infringement. I am not responsible for the contents of the API. </p>';
  res.send(text);
});

/* popular items, with pagination */
app.get('/:videoId', requestCache(60 * 60 * 12), function (req, res) {
  if (req.params.videoId === '' || req.params.videoId === 'favicon.ico') {
    return;
  }

  var url = 'https://openload.co/embed/' + req.params.videoId + '/';
  _youtubeDl2.default.getInfo(url, function (err, info) {
    if (err) {
      res.send({ status: false, error: 'Unknown error occurred!' });
    }

    res.send({
      success: true,
      data: {
        id: info.id,
        title: info.title,
        stream: info.url,
        thumbnail: info.thumbnail
      }
    });
  });
});

/** LISTEN **/
app.listen(port);
console.log('Listening on: ' + port);