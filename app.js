// Setup server, session and middleware here.
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// const BodyParser = require("body-parser");
const configRoutes = require("./routes");

const app = express();
const static = express.static(__dirname + "/public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", static);

app.use(
  session({
    name: "TimeTracker",
    secret: "The secret to success involves effective time management",
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 6000000 },
    
  })
);

// MIDDLEWARE GOES BELOW:

// LOGGING MIDDLEWARE
app.use(async (req, res, next) => {
  const dateString = new Date().toUTCString();
  const reqMethod = req.method;
  const reqRoute = req.originalUrl;
  console.log(`[${dateString}]: ${reqMethod} ${reqRoute}`);
  next();
});

// AUTH MIDDLEWARE FOR ALL PATHS EXCEPT AUTH PATHS
app.use('*', async(req, res, next) => {
  const reqPath = req.originalUrl;
  if (reqPath == '/login' || reqPath == '/signup' || reqPath == '/otp') {
    if(req.session?.user?.verified) {
      return res.redirect("/home");
    }
  } else if (!req.session.user || !req.session.user.verified) {
    return res.redirect("/login");
  }
  next();
})

// MIDDLEWARE ENDS HERE

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});