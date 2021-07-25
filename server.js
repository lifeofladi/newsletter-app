require("dotenv").config();
const express = require("express");
const app = express();
const home = require("./routes/home");

//setting templating engine to EJS
app.set("view engine", "ejs");

//parse url encoded values
app.use(express.urlencoded({ extended: true }));

//serve static files
app.use(express.static("public"));

app.use("/", home);

app.listen(3300, () => {
  console.log("listening on port 3300");
});
