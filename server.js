const express = require("express");
// const axios = require("axios");
const app = express();
const mailchimpAPI = require("./mailchimp-api");

// app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Handle Home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

//Handling POST request from home route
app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  mailchimpAPI.addContactToList(firstName, lastName, email);

  res.redirect("/");
});

app.listen(3300, () => {
  console.log("listening on port 3300");
});
