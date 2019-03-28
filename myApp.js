
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
  const {method, ip, path} = req
  console.log(`${method} ${path} - ${ip}`);
  next();
});

// --> 11)  Mount the body-parser middleware  here
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log('Hello World');

/** 2) A first working Express Server */

// app.get('/', (req, res) => {
//   res.send('Hello Express');
// });

/** 3) Serve an HTML file */
app.get('/', (req, res) => { 
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
const staticAssets = express.static(__dirname + '/public');
app.use(staticAssets);

/** 5) serve JSON on a specific route */
/** 6) Use the .env file to configure the app */
app.get('/json', (req, res)=> {
  const message = process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : 'Hello json';
  res.json({
    "message": message
  });
});
   
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({
    "time": req.time
  });
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res) => {
  res.json({
    "echo": req.params.word
  });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
/** 12) Get data form POST  */
app.route('/name')
  .get((req, res) => {
    const {first, last} = req.query
    res.json({
      "name": `${first} ${last}`
    });
  })
  .post((req, res) => {
    const {first, last} = req.body
    res.json({
      "name": `${first} ${last}`
    });
  });
  
// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;