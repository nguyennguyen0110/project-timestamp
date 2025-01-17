// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  //new Date() return date object
  let now = new Date();
  //Date.parse() return miliseconds Number
  let unix = Date.parse(now);
  //.toGMTString format date object in GMT
  res.json({unix: unix, utc: now.toGMTString()});
});

app.get('/api/:input', (req, res) => {
  //Check if input is number (miliseconds) or else is date format
  if (!isNaN(req.params.input)) {
    let date = new Date(Number(req.params.input));
    res.json({unix: Number(req.params.input), utc: date.toGMTString()});
  }
  else {
    let date = new Date(req.params.input);
    //Check if input can convert to a valid date or not
    if (date == 'Invalid Date') {
      res.json({error: date.toGMTString()});
    }
    else {
      let unix = Date.parse(req.params.input);
      res.json({unix: unix, utc: date.toGMTString()});
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
