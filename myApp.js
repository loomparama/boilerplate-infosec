/**********************************************
 * 4. Applied InfoSec Challenges
 * =============================
 ***********************************************/

var express = require("express"); // Do Not Edit
var app = express(); // Do Not Edit

var ninetyDaysInSeconds = 90 * 24 * 60 * 60;

module.exports = app;

var api = require("./server.js");
var helmet = require("helmet");

app.use(
  helmet({
    hidePoweredBy: {
      setTo: "PHP 4.2.0"
    },
    frameguard: {
      action: "deny"
    },
    xssFilter: true,
    noSniff: true,
    ieNoOpen: true,
    noCache: true,
    hsts: {
      maxAge: ninetyDaysInSeconds,
      force: true
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"]
      }
    },
    dnsPrefetchControl: true
  })
);
app.use(express.static("public"));

app.disable("strict-transport-security");

app.use("/_api", api);

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

var listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
