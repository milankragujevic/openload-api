# openload-api

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Openload Nodejs API for fetching stream URLs with PhantomJS

Copyright © 2018 Milan Kragujević and contributors

By using this API you may be committing copyright infringement. I am not responsible for the contents of the API.


## How to run

```
git clone https://github.com/milankragujevic/openload-api
cd openload-api
npm install 
npm install --save-dev 
npm run build
sudo apt install -y libfontconfig1 libfontconfig1-dev
sudo wget "https://github.com/ariya/phantomjs/releases/download/2.1.3/phantomjs" -O /usr/local/bin/phantomjs
sudo chmod +x /usr/local/bin/phantomjs
cd ~
wget http://archive.ubuntu.com/ubuntu/pool/main/i/icu/libicu55_55.1-7_amd64.deb -O /tmp/libicu55_55.1-7_amd64.deb
sudo dpkg -i /tmp/libicu55_55.1-7_amd64.deb
rm /tmp/libicu55_55.1-7_amd64.deb
```

## Documentation

Coming soon, basically just open http://127.0.0.1:4000/[openloadID] and you'll get a JSON with the video stream. 

The stream is valid only for the user's IP and expires after 24 hours.

