var express = require("express");
var app = express();

//---Added by Akhil Nayak 0206
//below 2 lines are for Use body-parser challenge
const bodyParser = require("body-parser"); //---Added by Akhil Nayak 0206
app.use(bodyParser.urlencoded({ extended: false })); //---Added by Akhil Nayak 0206----

// --> 7)  Mount the Logger middleware here

// --> 11)  Mount the body-parser middleware  here

/** 1) Meet the node console. */

console.log("Hello World");

/** 2) A first working Express Server */
app.get("/", (req, res, next) => {
  res.send("Hello Express");
});

/** 3) Serve an HTML file */
let absolutePath = __dirname + "/views/index.html"; //this line edit to get the html file from views
app.get("/home", (req, res, next) => {
  res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
let staticPath = __dirname + "/public";
app.use(express.static(staticPath));

/** 5) serve JSON on a specific route */

// --- Edited by Akhil Nayak 0206 ---
// commented the below code so that  code 6) would work.

// app.get('/json',(req,res,next)=>{
// console.log("serve json")
//   res.json({"message":"Hello json"});
//   next();
// })

/** 6) Use the .env file to configure the app */

// --- Edited by Akhil Nayak 0206 ---
// Wasted more than 2 hrs for this thing to work
// npm install dotenv --save
// require('dotenv').config(); //in server.js
//you don't need to make these changes since I already did.
//just make .env file and add MESSAGE_STYLE="uppercase"

app.get("/json", (req, res, next) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

/** 8) Chaining middleware. A Time server */

getDate = () => {
  return new Date().toString();
};

app.get(
  "/now",
  (req, res, next) => {
    req.time = getDate();
    next();
  },
  (req, res, next) => {
    res.send(req.time);
  }
);

/** 9)  Get input from client - Route parameters */

app.get("/:word/word", (req, res, next) => {
  res.send(req.params.word);
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app
  .route("/name")
  .get((req, res, next) => {
    var { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
  })
  //.post(); //--- Edited by Akhil Nayak 0206 --- Added post to make a cleaner code for further challenges as said by FCC in challenge
  //Will use .post() in 12th

  /** 11) Get ready for POST Requests - the `body-parser` */
  // place it before all the routes !

  // Added require body parser and then .urlencoded extended: false --- Edited by Akhil Nayak 0206 ---

  /** 12) Get data form POST  */
  .post((req, res, next) => {
    var { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
  });
// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
